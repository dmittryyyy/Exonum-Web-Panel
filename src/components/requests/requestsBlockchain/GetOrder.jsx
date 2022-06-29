import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';

export const GetOrder = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { orderId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(orderId ? orderId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    const onGetOrder = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchOrder(client.activeNode, isValueSearch)
                        .then((orders) => {
                            if (!orders || orders === []) {
                                setIsError('Data undefined!');
                            }
                            setDataJsonFormat(hexadecimal((orders.data.order_seller_part.items[0].application_data)));
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setIsError(`Order number uncorrect! ${e.message}`);
                    setDataJsonFormat('');
                    if (e.response.status >= 500) {
                        setIsError('Unexpected error, please try again later...');
                    }
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

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onGetOrder();
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onGetOrder();
        }
    }, []);

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Order search'
                        onKeyDown={onKeyDown}
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={onGetOrder}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent data={dataJsonFormat} />
        </>

    )
}
