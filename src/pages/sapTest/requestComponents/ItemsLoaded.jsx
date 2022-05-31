import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapTestAPI';
import { columnsItemsLoaded } from '../ColumnsTable';
import { ContentSapTest } from '../ContentSapTest';

export const ItemsLoaded = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
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
                } catch (err) {
                    console.log(err);
                }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter id VendingMachines'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={itemsLoaded}>Search</button>
                <p>{isError}</p>
            </div>

            <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
        </>

    )
}
