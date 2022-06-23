import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUserSapInfo, getVendingProfilesBenefits, getDataForEachCard, getUsersBenefits, getUserCards } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const UserSapInfo = () => {

    const { client } = useContext(ThemeContext);

    let { user_infoId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_infoId ? user_infoId : '');
    const [isDataSapInfo, setIsDataSapInfo] = useState();
    const [isDataRelatedReq, setDataRelatedReq] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const userSapInfo = async () => {
        if (isValueSearch) {
            try {
                await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        setIsDataSapInfo(resp);
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

    useEffect(() => {
        if (isValueSearch) {
            userSapInfo();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onChainQueries = async () => {
        const array = [];
        let id = isDataSapInfo.id;
        await getUserCards(client.activeAPI + `/${'external/api/v1'}`, id)
            .then(resp => {
                array.push(resp);
            });
        await getDataForEachCard(array[0], client.activeAPI + `/${'api/'}`, 'cards/')
            .then(res => {
                array.push(...res);
            });
        await getVendingProfilesBenefits(client.activeAPI + '/api/', id)
            .then(resp => {
                array.push(resp);
            });
        await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
            .then(resp => {
                array.push(resp);
            });
        setDataRelatedReq(array)
    }

    return (

        <>
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

            {isDataSapInfo ?

                <div>
                    <button onClick={onChainQueries}>Related queries</button>

                    <RequestContent data={isDataRelatedReq} />

                </div>
                : ''}
        </>
    )
}