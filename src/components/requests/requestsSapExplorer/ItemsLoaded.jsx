import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ItemsLoaded = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { items_loadedId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(items_loadedId ? items_loadedId : '');
    const [isDataItemsLoaded, setisDataItemsLoaded] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

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

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onItemsLoaded();
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onItemsLoaded();
        }
    }, []);

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter id VendingMachines'
                        onKeyDown={onKeyDown}
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={onItemsLoaded}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent
                data={isDataItemsLoaded}
                columnsTable={columnsSapExplorer.itemsLoaded} />

        </>

    )
}
