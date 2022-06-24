import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getItemsLoaded } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const ItemsLoaded = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { items_loadedId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(items_loadedId ? items_loadedId : '');
    const [isDataItemsLoaded, setisDataItemsLoaded] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const itemsLoaded = async () => {
        if (isValueSearch) {
                try {
                    await getItemsLoaded(client.activeAPI + '/api/', isValueSearch)
                        .then(resp => {
                            setisDataItemsLoaded(resp);
                        });
                        setIsError('');
                        setClassInput('search');
                        navigate(isValueSearch);
                } catch (err) {
                    console.log(err);
                }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            itemsLoaded();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <NavBarForRelatedQueries/>

            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter id VendingMachines'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={itemsLoaded}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent 
            data={isDataItemsLoaded} 
            columnsTable={columnsSapExplorer.itemsLoaded} />
        </>

    )
}
