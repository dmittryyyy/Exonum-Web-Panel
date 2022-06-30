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

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const [dataRelatedReq, setDataRelatedReq] = useState();

    const onUsersCards = async () => {
        if (isValueSearch) {
            try {
                await getUserCards(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setIsDataUserCards(resp);
                            setIsError('');
                            setClassInput('search');
                        }
                    });
                navigate(isValueSearch);
            } catch (e) {
                console.log(e);
                setIsError(`The data you entered is incorrect! ${e.message}`);
                setIsDataUserCards('');
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
            setIsError('Run the main query first!');
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
                    onClick={onChainQueries}>Chain queries</button>} />

            <InputForRequest classInput={classInput} placeholder={'Enter user id'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onUsersCards} />

            <RequestContent
                data={isDataUserCards}
                columnsTable={columnsSapExplorer.userCards} />

            {dataRelatedReq ? <h4>Data related queries</h4> : ''}
            <RequestContent
                data={dataRelatedReq}
                columnsTable={columnsSapExplorer.userCardsRelQuer} />
        </>
    )
});
