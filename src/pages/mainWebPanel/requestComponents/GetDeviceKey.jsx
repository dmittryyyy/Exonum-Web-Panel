import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/NodeAPI';
import { columnsDeviceKey } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetDeviceKey = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable, navBarItem }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const [isHistory, seIsHistory] = useState();

   
    const GetDeviceKey = async () => {
        setColumnsTable(columnsDeviceKey);
        try {
            if (isValueSearch) {
                await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                    .then((key) => {
                        setDataJsonFormat(key);
                        setDataTableFormat([key]);
                    })
            } else {
                setDataJsonFormat('Device key undefined or empty input field!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Enter device key'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={GetDeviceKey}>Search</button>

            {navBarItem.name === 'Search device key' ?
                    <div className="checkbox">
                        <input type="checkbox"
                            className='checkboxHistory'
                            onChange={(e) => seIsHistory(e.target.checked)}
                        />
                        <label>Show History</label>
                    </div>
                    : ''}
        </div>

    )
}
