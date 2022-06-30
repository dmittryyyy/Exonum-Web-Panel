import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUserSapInfo, getBenefitRules, getDataForEachCard, getUsersBenefits, getUserCards, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const UserSapInfo = () => {

    const { client } = useContext(ThemeContext);

    let { user_infoId } = useParams();
    let { relatedReq } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_infoId ? user_infoId : '');
    const [isRelatedReq, setIsRelatedReq] = useState(relatedReq ? relatedReq : '');

    const [isDataSapInfo, setIsDataSapInfo] = useState('');
    const [isDataRelatedReq, setDataRelatedReq] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const onUserSapInfo = async () => {
        if (isValueSearch) {
            try {
                await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setIsDataSapInfo(resp);
                            setIsRelatedReq(resp.blockchainId);
                            setIsError('');
                        }

                    });
                navigate(isValueSearch);
            } catch (e) {
                console.log(e);
                setIsError(`The data you entered is incorrect! ${e.message}`);
                setIsDataSapInfo('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
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
                    array.push([resp]);
                });
            await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    array.push(resp);
                });
            setDataRelatedReq(array);
        } catch (e) {
            console.log(e);
            setIsError('Run the main query first!');
        }
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsError('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsError('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data]);
                })
            } catch (e) {
                console.log(e);
                setIsError(e.message);
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
            />

            <InputForRequest classInput={classInput} placeholder={'Enter user id'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onUserSapInfo} />

            <RequestContent data={isDataSapInfo} />

            {isDataRelatedReq ? <h4>Data related queries</h4> : ''}
            <Routes>
                <Route path='' element={<RequestContent data={isDataRelatedReq} />}>
                    <Route path=':user_infoId/:relatedReq' element={<RequestContent data={isDataRelatedReq} />} />
                </Route>
            </Routes>

            {isDataBlockchain ? <h4>Blockchain profile</h4> : ''}
            <RequestContent data={isDataBlockchain} />
        </>
    )
};
