import { React, useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/NodeAPI';
import { columnsDeviceKey } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetDeviceKey = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { device_Key } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(device_Key ? device_Key : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const [isHistory, seIsHistory] = useState();

    const getDeviceKey = async () => {
        setColumnsTable(columnsDeviceKey);
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                        .then((key) => {
                            setDataJsonFormat(key);
                            setDataTableFormat([key]);
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (error) {
                    console.log(error);
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

    useEffect(() => {
        if (isValueSearch) {
            getDeviceKey();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (
        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter device key'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={getDeviceKey}>Search</button>
            </div>

            <div className="checkbox">
                <input type="checkbox"
                    className='checkboxHistory'
                    onChange={(e) => seIsHistory(e.target.checked)}
                />
                <label>Show History</label>
            </div>

            <p>{isError}</p>

            <Routes>
                <Route path={isValueSearch} element={<ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />} />
            </Routes>
        </>


    )
}
