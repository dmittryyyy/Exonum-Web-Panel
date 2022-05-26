import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getShopItems } from '../../../services/SapTestAPI';
import { columnsShop } from '../../../components/columnsTable/mainPage/ColumnsTable';

export const ShopItems = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [countInput, setCountInput] = useState('');

    const shopItems = async () => {
        try {
            await getShopItems(client.sveklaServerV1, countInput)
                .then(resp => {
                    setDataTableFormat(resp);
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                    setColumnsTable(columnsShop);
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            <div className='limit'>
                <input type="number" placeholder='Enter limit elements' max={100} onChange={(e) => setCountInput(e.target.value)} value={countInput} />
                <button onClick={shopItems}>Найти</button>
            </div>

        </>
    )
}
