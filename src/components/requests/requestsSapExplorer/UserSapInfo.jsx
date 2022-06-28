import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUserSapInfo, getVendingProfilesBenefits, getDataForEachCard, getUsersBenefits, getUserCards, blockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const UserSapInfo = () => {

    const { client } = useContext(ThemeContext);

    let { user_infoId } = useParams();
    let { relatedReq } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_infoId ? user_infoId : '');
    const [isRelatedReq, setIsRelatedReq] = useState(relatedReq ? relatedReq : '');

    const [isDataSapInfo, setIsDataSapInfo] = useState('');
    const [isDataRelatedReq, setDataRelatedReq] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const userSapInfo = async () => {
        if (isValueSearch) {
            try {
                await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        setIsDataSapInfo(resp);
                        setIsRelatedReq(resp.blockchainId)
                    });    
                setIsError('');
                navigate(isValueSearch);
            } catch (err) {
                console.log(err);
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    }

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onChainQueries = async () => {
        const array = [];
        let id;
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
        await getVendingProfilesBenefits(client.activeAPI + '/api/', id)
            .then(resp => {
                array.push([resp]);
            });
        await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
            .then(resp => {
                array.push(resp);
            });
        setDataRelatedReq(array);
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
            .then(resp => {
                idBlockchian = resp.blockchainId;
            });
        await blockchainProfile(idBlockchian).then(data => {
            setDataRelatedReq([data]);
        })
    }

    useEffect(() => {
        if (isValueSearch && isRelatedReq) {
            userSapInfo();
            onChainQueries();
        } else if (isValueSearch) {
            userSapInfo();
        }
    }, []);

    return (

        <>
            <NavBarForRelatedQueries onChainQueries={onChainQueries} isValueSearch={isValueSearch} onBlockchainProfile={onBlockchainProfile}/>

            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={userSapInfo}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent data={isDataSapInfo} />


            <Routes>
                <Route path='' element={<RequestContent data={isDataRelatedReq} />}>
                    <Route path=':user_infoId/:relatedReq' element={<RequestContent data={isDataRelatedReq} />} />
                </Route>
            </Routes>
        </>
    )
};
