import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapTestAPI';
import { columnsItemsLoaded } from '../ColumnsTable';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ItemsLoaded = () => {

    const { client } = useContext(ThemeContext);

    let { items_loadedId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(items_loadedId ? items_loadedId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const itemsLoaded = async () => {
        setColumnsTable(columnsItemsLoaded);
        if (isValueSearch) {
                try {
                    await getItemsLoaded(client.sveklaServer, isValueSearch)
                        .then(resp => {
                            setDataJsonFormat(JSON.stringify(resp, null, 2));
                            setDataTableFormat(resp);
                        });
                        setIsError('');
                        setClassInput('search');
                        navigate(isValueSearch);
                } catch (err) {
                    console.log(err);
                }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            itemsLoaded();
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
                    <input placeholder='Enter id VendingMachines'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={itemsLoaded}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
        </>

    )
}
