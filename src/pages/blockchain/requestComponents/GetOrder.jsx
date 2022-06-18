import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const GetOrder = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { orderId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(orderId ? orderId : '');
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
                    navigate(isValueSearch);
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

    useEffect(() => {
        if (isValueSearch) {
            getOrder();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Order search'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={getOrder}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} />
        </>

    )
}
