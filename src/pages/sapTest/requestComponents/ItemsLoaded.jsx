import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapTestAPI';
import { columnsItemsLoaded } from '../ColumnsTable';

export const ItemsLoaded = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const itemsLoaded = async () => {
        setColumnsTable(columnsItemsLoaded);
        try {
            await getItemsLoaded(client.sveklaServer, isValueSearch)
                .then(resp => {
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                    setDataTableFormat(resp);
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

            <div className="searchWrapper">
                <div className='search'>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter id VendingMachines'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={itemsLoaded}>Search</button>
            </div>

    )
}
