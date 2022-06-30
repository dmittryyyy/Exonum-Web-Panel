import { React, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getShopItems } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const ShopItems = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { limit } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(limit ? limit : '');
    const [isDataShopItems, setisDataShopItems] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const validationLimit = (str) => {
        return str > 0 && str < 1001;
    };

    const onShopItems = async (setErrorInput, setIsErrorRequest) => {
        if (validationLimit(isValueSearch)) {
            try {
                setIsLoading(true);
                await getShopItems(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setisDataShopItems(resp);
                            setErrorInput('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setErrorInput(e.message);
                if (e.response.status >= 500) {
                    setErrorInput('Unexpected error, please try again later...');
                }
                setIsErrorRequest(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrorInput('Enter limit!');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onShopItems();
        }
    }, []);

    return (

        <>
            <InputForRequest placeholder={'Enter limit elements'} type={'number'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onShopItems} />

            <RequestContent
                data={isDataShopItems}
                columnsTable={columnsSapExplorer.shopItems} 
                isLoading={isLoading} />
        </>

    )
}
