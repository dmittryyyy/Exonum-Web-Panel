import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';

export const GetDeviceKey = ({ testHash }) => {

    const { client, columnsBlockchain } = useContext(ThemeContext);

    let { device_Key } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(device_Key ? device_Key : '');
    const [isDataDeviceKey, setIsDeviceKey] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const [isHistory, seIsHistory] = useState();

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onGetDeviceKey = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                        .then((key) => {
                            if(!key || key === []) {
                                setIsError('Data undefined!'); 
                            }
                          setIsDeviceKey([key]);
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setIsError(`The data you entered is incorrect! ${e.message}`);
                    setIsDeviceKey('');
                    if(e.response.status >= 500) {
                        setIsError('Unexpected error, please try again later...');
                    }
                }
            } else {
                setIsError('Not a HEX string');
                setClassInput('searchError')
            }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError')
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onGetDeviceKey();
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onGetDeviceKey();
        }
    }, []);

    return (
        
        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter device key'
                        onKeyDown={onKeyDown}
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={onGetDeviceKey}>Search</button>
                <p>{isError}</p>
            </div>

            <div className="checkbox">
                <input type="checkbox"
                    className='checkboxHistory'
                    onChange={(e) => seIsHistory(e.target.checked)}
                />
                <label>Show History</label>
            </div>

            <RequestContent 
            data={isDataDeviceKey} 
            columnsTable={columnsBlockchain.deviceKey} />
        </>

    )
}
