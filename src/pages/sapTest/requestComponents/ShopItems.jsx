import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getShopItems } from '../../../services/SapTestAPI';
import { columnsShop } from '../ColumnsTable';
import { ContentSapTest } from '../ContentSapTest';


export const ShopItems = () => {

    const { client } = useContext(ThemeContext);

    const [countInput, setCountInput] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const shopItems = async () => {
        setColumnsTable(columnsShop);
        try {
            await getShopItems(client.sveklaServerV1, countInput)
                .then(resp => {
                    setDataTableFormat(resp);
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

       <>
        <div className="searchWrapper">
            <div className='search'>
                <input type="number" placeholder='Enter limit elements' max={100} onChange={(e) => setCountInput(e.target.value)} value={countInput} />
            </div>
            <button onClick={shopItems}>Search</button>
        </div>

        <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable}/>
       </>

    )
}
