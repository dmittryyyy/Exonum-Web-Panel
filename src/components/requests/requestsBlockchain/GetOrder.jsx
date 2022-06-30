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
    const [isDataOrder, setIsDataOrder] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    const onGetOrder = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    setIsLoading(true);
                    await searchOrder(client.activeNode, isValueSearch)
                        .then((orders) => {
                            if (!orders || orders === []) {
                                setErrorInput('Data undefined!');
                            }
                            setIsDataOrder(hexadecimal((orders.data.order_seller_part.items[0].application_data)));
                            setErrorInput('');
                            navigate(isValueSearch);
                        });
                } catch (e) {
                    console.log(e);
                    setErrorInput(`Order number uncorrect! ${e.message}`);
                    if (e.response.status >= 500) {
                        setErrorInput('Unexpected error, please try again later...');
                    }
                    setIsErrorRequest(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrorInput('Not a HEX string');
            }
        } else {
            setErrorInput('Empty search string!');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onGetOrder();
        }
    }, []);

    return (

        <>
            <InputForRequest placeholder={'Enter order number'}
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetOrder}/>

            <RequestContent data={isDataOrder} isLoading={isLoading}/>
        </>

    )
}
