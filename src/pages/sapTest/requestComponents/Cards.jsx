import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getCards } from '../../../services/SapTestAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const Cards = observer(() => {

    const { client } = useContext(ThemeContext);

    let { cards } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(cards ? cards : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const columnsCards = [
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
            wrap: true
        },
        {
            name: 'userId',
            selector: (row) => row.userId,
            sortable: true,
            wrap: true
        },
        {
            name: 'type',
            selector: (row) => row.type,
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
            name: 'createdOn',
            selector: (row) => row.createdOn,
            sortable: true,
            wrap: true
        },
        {
            name: 'modifiedOn',
            selector: (row) => row.modifiedOn,
            sortable: true,
            wrap: true
        },
    ]

    const Cards = async () => {
        setColumnsTable(columnsCards);
        if (isValueSearch) {
            try {
                await getCards(client.activeAPI, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(resp);
                        setDataTableFormat([resp]);
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
            Cards();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter card id'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={Cards}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
        </>

    )
});
