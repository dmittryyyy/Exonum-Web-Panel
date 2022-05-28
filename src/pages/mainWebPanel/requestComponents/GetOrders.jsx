import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/NodeAPI';
import { columnsOrders } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetOrders = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };
   
    const GetOrders = async () => {
        setColumnsTable(columnsOrders);
        try {
            if (testHash(isValueSearch)) {
                await searchOrders(client.activeNode, isValueSearch)
                    .then((orders) => {
                        orders.data.map((elements) => {
                            elements.status.splice(0, elements.status.length - 1);
                            setDataJsonFormat(orders.data);
                            setDataTableFormat(orders.data);
                        });
                    });
            } else {
                setDataJsonFormat('Order number uncorrect or empty input field!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Orders search'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={GetOrders}>Search</button>
        </div>

    )
}
