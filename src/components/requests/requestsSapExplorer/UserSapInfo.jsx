import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUserSapInfo, getBenefitRules, getDataForEachCard, getUsersBenefits, getUserCards, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const UserSapInfo = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_infoId } = useParams();
    let { relatedReq } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_infoId ? user_infoId : '');
    const [isRelatedReq, setIsRelatedReq] = useState(relatedReq ? relatedReq : '');

    const [isDataSapInfo, setIsDataSapInfo] = useState('');
    const [isDataRelatedReq, setDataRelatedReq] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();
    const [isErrorRelQuer, setIsisErrorRelQuer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onUserSapInfo = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            try {
                setIsLoading(true);
                await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setIsDataSapInfo(resp);
                            setIsRelatedReq(resp.blockchainId);
                            setErrorInput('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setErrorInput(`The data you entered is incorrect! ${e.message}`);
                if (e.response.status >= 500) {
                    setErrorInput('Unexpected error, please try again later...');
                }
                setIsErrorRequest(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrorInput('Empty search string!')
        }
    }

    const onChainQueries = async () => {
        const array = [];
        let id;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    id = resp.id;
                });
            navigate(`${isValueSearch}/` + isRelatedReq);
            await getUserCards(client.activeAPI + `/${'external/api/v1'}`, id)
                .then(resp => {
                    array.push(resp);
                });
            await getDataForEachCard(array[0], client.activeAPI + `/${'api/'}`, 'cards/')
                .then(res => {
                    array.push([...res]);
                });
            await getBenefitRules(client.activeAPI + '/api/', id)
                .then(resp => {
                    array.push(resp);
                });
            await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    array.push(resp);
                });
            setDataRelatedReq(array);
        } catch (e) {
            console.log(e);
            setIsisErrorRelQuer('Run the main query first!');
        }
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsisErrorRelQuer('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsisErrorRelQuer('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data.data]);
                })
            } catch (e) {
                console.log(e);
                setIsisErrorRelQuer(e.message);
            }
        }
    }

    useEffect(() => {
        if (isValueSearch && isRelatedReq) {
            onUserSapInfo();
            onChainQueries();
        } else if (isValueSearch) {
            onUserSapInfo();
        }
    }, []);

    return (

        <>
            <NavBarForRelatedQueries
                onChainQueriesUserInfo={<button className='list-queries-item' onClick={onChainQueries}>Chain queries</button>}
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
                isErrorRelQuer={isErrorRelQuer}
            />

            <InputForRequest placeholder={'Enter user id'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onUserSapInfo} />

            <RequestContent data={isDataSapInfo} isLoading={isLoading} />

            <Routes>
                <Route path='' element={<RequestContent data={isDataRelatedReq} title={'Data related queries'} />}>
                    <Route path=':user_infoId/:relatedReq' element={<RequestContent data={isDataRelatedReq} />} />
                </Route>
            </Routes>

            <RequestContent data={isDataBlockchain} columnsTable={columnsSapExplorer.blockchainProfile} title={'Blockchain profile'} />
        </>
    )
};
