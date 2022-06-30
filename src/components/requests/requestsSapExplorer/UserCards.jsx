import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getUserCards, getUserSapInfo, getDataForEachCard } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const UserCards = observer(() => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_card } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_card ? user_card : '');
    const [isDataUserCards, setIsDataUserCards] = useState();

    const [dataRelatedReq, setDataRelatedReq] = useState();
    const [isErrorRelQuer, setIsisErrorRelQuer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onUsersCards = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            try {
                setIsLoading(true);
                await getUserCards(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setIsDataUserCards(resp);
                            setErrorInput('');
                            setIsisErrorRelQuer('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });   
            } catch (e) {
                console.log(e);
                setErrorInput(`The data you entered is incorrect! ${e.message}`);
                setIsDataUserCards('');
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
        try {
            await getDataForEachCard(isDataUserCards, client.activeAPI + `/${'api/'}`, 'cards/')
                .then(res => {
                    array.push(...res);
                });
            await getUserSapInfo(client._activeAPI + `/${'external/api/v1'}`, isDataUserCards[0].cardHolderId)
                .then(resp => array.push(resp));
            setDataRelatedReq(array);
        } catch (e) {
            console.log(e);
            setIsisErrorRelQuer('Run the main query first!');
        }
    }

    useEffect(() => {
        client.setActiveAPI(localStorage.getItem('url api'));
        if (isValueSearch) {
            onUsersCards();
        }
    }, []);

    return (
        <>
            <NavBarForRelatedQueries
                onChainQueriesUserCards={<button className='list-queries-item'
                    onClick={onChainQueries}>Chain queries</button>} isErrorRelQuer={isErrorRelQuer}/>

            <InputForRequest placeholder={'Enter user id'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onUsersCards} />

            <RequestContent
                data={isDataUserCards}
                columnsTable={columnsSapExplorer.userCards} isLoading={isLoading}/>

            <RequestContent
                title={'Data related queries'}
                data={dataRelatedReq}
                columnsTable={columnsSapExplorer.userCardsRelQuer} />
        </>
    )
});
