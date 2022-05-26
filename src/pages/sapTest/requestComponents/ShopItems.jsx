import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getShopItems } from '../../../services/SapTestAPI';

export const ShopItems = ({ setJsonFormat, setShopItemsTable }) => {

    const { client } = useContext(ThemeContext);

    const [countInput, setCountInput] = useState('');
    const [classInput, setClassInput] = useState('limit');


    const shopItems = async () => {
        try {
            await getShopItems(client.sveklaServerV1, countInput)
                .then(resp => {
                    setShopItemsTable(resp);
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            <div className={classInput}>
                <input type="number" placeholder='Enter limit elements' max={100} onChange={(e) => setCountInput(e.target.value)} value={countInput} />
                <button onClick={shopItems}>Найти</button>
            </div>

        </>
    )
}
