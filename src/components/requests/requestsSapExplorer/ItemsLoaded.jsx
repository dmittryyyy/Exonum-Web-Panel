import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const ItemsLoaded = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { items_loadedId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(items_loadedId ? items_loadedId : '');
    const [isDataItemsLoaded, setisDataItemsLoaded] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onItemsLoaded = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            try {
                setIsLoading(true);
                await getItemsLoaded(client.activeAPI + '/api/', isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput(`Data undefined!`);
                        } else {
                            setisDataItemsLoaded(resp);
                            setErrorInput('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setErrorInput(`The data you entered is incorrect! ${e.message}`);
                if (e.response.status >= 500) {
                    setErrorInput('Unexpected error, please try again later...');
                }
                setIsErrorRequest(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrorInput('Empty search string!');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onItemsLoaded();
        }
    }, []);

    return (
        <>
            <InputForRequest placeholder={'Enter id vending machine'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onItemsLoaded} />

            <RequestContent
                data={isDataItemsLoaded}
                columnsTable={columnsSapExplorer.itemsLoaded} 
                isLoading={isLoading} />
        </>
    )
}
