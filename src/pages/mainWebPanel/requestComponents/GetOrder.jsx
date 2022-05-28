import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/NodeAPI';

export const GetOrder = ({ setDataJsonFormat, setDataTableFormat }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    const getOrder = async () => {
        try {
            await searchOrder(client.activeNode, isValueSearch)
                .then((orders) => {
                    setDataJsonFormat(hexadecimal((orders.data.order_seller_part.items[0].application_data)));
                    setDataTableFormat('');
                });
        } catch (error) {
            console.log(error);
            setDataJsonFormat('Order number uncorrect or empty input field!');
        }
    }

    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Order search'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={getOrder}>Search</button>
        </div>

    )
}
