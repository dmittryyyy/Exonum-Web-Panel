import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/NodeAPI';

export const GetOrder = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();

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
                });
        } catch (error) {
            console.log(error);
            setDataJsonFormat('Order number uncorrect or empty input field!');
        }
    }

    return (

        <>
        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Order search'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={getOrder}>Search</button>
        </div>

<div className='resultWrapper'>
{dataJsonFormat ?
  <Accordion default-key="0">
    <Accordion.Item eventKey='0'>
      <Accordion.Header>JSON Format</Accordion.Header>
      <Accordion.Body>
        <pre className={'isError'}>{JSON.stringify(dataJsonFormat, null, 2)}</pre>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  : ''}
</div>
        </>

    )
}
