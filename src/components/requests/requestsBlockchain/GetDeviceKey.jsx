import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const GetDeviceKey = ({ testHash }) => {

    const { client, columnsBlockchain } = useContext(ThemeContext);

    let { device_Key } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(device_Key ? device_Key : '');
    const [isDataDeviceKey, setIsDeviceKey] = useState();
    const [isHistory, seIsHistory] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onGetDeviceKey = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    setIsLoading(true);
                    await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                        .then((key) => {
                            if(!key || key === []) {
                                setErrorInput('Data undefined!'); 
                            }
                          setIsDeviceKey([key]);
                          setErrorInput('');
                          setIsErrorRequest(false);
                        });
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setErrorInput(`The data you entered is incorrect! ${e.message}`);
                    setIsDeviceKey('');
                    if(e.response.status >= 500) {
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
            onGetDeviceKey();
        }
    }, []);

    return (
        
        <>
            <InputForRequest placeholder={'Enter device key'}
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetDeviceKey}/>

            <div className="checkbox">
                <input type="checkbox"
                    className='checkboxHistory'
                    onChange={(e) => seIsHistory(e.target.checked)}
                />
                <label>Show History</label>
            </div>

            <RequestContent 
            data={isDataDeviceKey} 
            columnsTable={columnsBlockchain.deviceKey} 
            isLoading={isLoading} />
        </>

    )
}
