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

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const onItemsLoaded = async () => {
        if (isValueSearch) {
            try {
                await getItemsLoaded(client.activeAPI + '/api/', isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError(`Data undefined!`);
                        } else {
                            setisDataItemsLoaded(resp);
                            setIsError('');
                            setClassInput('search');
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setIsError(`The data you entered is incorrect! ${e.message}`);
                setClassInput('searchError');
                setisDataItemsLoaded('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onItemsLoaded();
        }
    }, []);

    return (

        <>
            <InputForRequest classInput={classInput} placeholder={'Enter id vending machine'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onItemsLoaded} />

            <RequestContent
                data={isDataItemsLoaded}
                columnsTable={columnsSapExplorer.itemsLoaded} />

        </>

    )
}
