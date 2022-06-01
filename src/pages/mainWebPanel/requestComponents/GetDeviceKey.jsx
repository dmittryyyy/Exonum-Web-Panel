import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/NodeAPI';
import { columnsDeviceKey } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetDeviceKey = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
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
                    setClassInput('search')
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

    return (
        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter device key'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={getDeviceKey}>Search</button>
                <p>{isError}</p>
            </div>

            <div className="checkbox">
                <input type="checkbox"
                    className='checkboxHistory'
                    onChange={(e) => seIsHistory(e.target.checked)}
                />
                <label>Show History</label>
            </div>

            <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
        </>


    )
}
