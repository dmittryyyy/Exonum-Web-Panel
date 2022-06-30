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

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const validationLimit = (str) => {
        if (isValueSearch) {
            return str > 0 && str < 1001;
        } else {
            setClassInput('searchError');
        }
    };

    const onShopItems = async () => {
        if (validationLimit(isValueSearch)) {
            try {
                await getShopItems(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setisDataShopItems(resp);
                            setIsError('');
                            setClassInput('search');
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setIsError(e.message);
                setisDataShopItems('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onShopItems();
        }
    }, []);

    return (

        <>

            <InputForRequest classInput={classInput} placeholder={'Enter limit elements'} type={'number'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onShopItems} />

            <RequestContent
                data={isDataShopItems}
                columnsTable={columnsSapExplorer.shopItems} />
        </>

    )
}
