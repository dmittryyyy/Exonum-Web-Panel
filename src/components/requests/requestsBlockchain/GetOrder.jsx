import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrder } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

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

    useEffect(() => {
        if (isValueSearch) {
            onGetOrder();
        }
    }, []);

    return (

        <>
            <InputForRequest classInput={classInput} placeholder={'Enter order number'}
            isError={isError} 
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetOrder}/>

            <RequestContent data={dataJsonFormat} />
        </>

    )
}
