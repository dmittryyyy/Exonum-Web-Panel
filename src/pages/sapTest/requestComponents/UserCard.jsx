import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getUserCards, chainQueries, getDataOnId } from '../../../services/SapTestAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { RelatedContentQueries } from '../../../components/requestContent/RelatedContentQueries';

export const UserCard = observer(() => {

    const { client } = useContext(ThemeContext);

    let { user_card } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_card ? user_card : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const [dataRelatedReq, setDataRelatedReq] = useState();

    const columnsUserCard = [
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
            wrap: true
        },
        {
            name: 'number',
            selector: (row) => row.number,
            sortable: true,
            wrap: true
        },
        {
            name: 'cardHolderId',
            selector: (row) => row.cardHolderId,
            sortable: true,
            wrap: true
        },
    ]

    const usersCard = async () => {
        setColumnsTable(columnsUserCard);
        if (isValueSearch) {
            try {
                await getUserCards(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(resp);
                        setDataTableFormat(resp);
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
            usersCard();
        }
    }, [isValueSearch]);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onChainQueries = async () => {
        const array = [];
        await getDataOnId(dataJsonFormat, client.sveklaServerV1, '/cards/')
        .then(res => {
            array.push(...res);
        });
        await chainQueries(client._activeAPI + `/${'external/api/v1'}`, 'users', dataJsonFormat[0].cardHolderId)
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
                <button onClick={usersCard}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />

            {dataJsonFormat ?
                <div className='btnRelatedQueries'>
                    <button className='btn' onClick={onChainQueries}>Related queries</button>

                    <RelatedContentQueries dataRelatedReq={dataRelatedReq}/>
                </div>
                : ''}
        </>

    )
});
