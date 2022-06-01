import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/NodeAPI';
import { ContentMain } from '../ContentMain';

export const GetOrder = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    const getOrder = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchOrder(client.activeNode, isValueSearch)
                        .then((orders) => {
                            setDataJsonFormat(hexadecimal((orders.data.order_seller_part.items[0].application_data)));
                        });
                    setIsError('');
                    setClassInput('search');
                } catch (error) {
                    console.log(error);
                    setIsError('Order number uncorrect!');
                }
            } else {
                setIsError('Not a HEX string');
                setClassInput('searchError');
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
                    <input placeholder='Order search'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={getOrder}>Search</button>
                <p>{isError}</p>
            </div>

            <ContentMain dataJsonFormat={dataJsonFormat} />
        </>

    )
}
