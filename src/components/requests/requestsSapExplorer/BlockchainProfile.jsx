import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getUserCards, getUserSapInfo, getDataForEachCard } from '../../../services/SapExplorer';
import { RequestContent } from '../../requestContent/RequestContent';

export const BlockchainProfile = observer(() => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_card } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_card ? user_card : '');
    const [isDataUserCards, setIsDataUserCards] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const [dataRelatedReq, setDataRelatedReq] = useState();

    const usersCards = async () => {
        if (isValueSearch) {
            try {
                await getUserCards(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        setIsDataUserCards(resp);
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
        client.setActiveAPI(localStorage.getItem('url api'));
        if (isValueSearch) {
            usersCards();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onChainQueries = async () => {
        const array = [];
        await getDataForEachCard(isDataUserCards, client.activeAPI + `/${'api/'}`, 'cards/')
        .then(res => {
            array.push(...res);
        });
        await getUserSapInfo(client._activeAPI + `/${'external/api/v1'}`, isDataUserCards[0].cardHolderId)
            .then(resp => array.push(resp));
            setDataRelatedReq(array);
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
                <button onClick={usersCards}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent 
            data={isDataUserCards} 
            columnsTable={columnsSapExplorer.userCards} />

            {isDataUserCards ?

                <div>
                    <button onClick={onChainQueries}>Related queries</button>

                    <RequestContent data={dataRelatedReq}/>

                </div>
                : ''}
        </>

    )
});
