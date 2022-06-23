import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';

export const GetDeviceKey = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { device_Key } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(device_Key ? device_Key : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const [isHistory, seIsHistory] = useState();

    const columnsDeviceKey = [
        {
          name: 'device_key_id',
          selector: (row) => row.device_key_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'order_id',
          selector: (row) => row.order_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'owner_id',
          selector: (row) => row.owner_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'administrator',
          selector: (row) => row.administrator,
          sortable: true,
          wrap: true,
        },
        {
          name: 'forward_agent',
          selector: (row) => row.forward_agent,
          sortable: true,
          wrap: true,
        },
        {
          name: 'user_id',
          selector: (row) => row.user_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'application_service_id',
          selector: (row) => row.application_service_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'sku_id',
          selector: (row) => row.sku_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'price',
          selector: (row) => row.price,
          sortable: true,
          wrap: true,
        },
        {
          name: 'device_key_description',
          selector: (row) => row.device_key_description,
          sortable: true,
          wrap: true,
        },
        {
          name: 'picture_url',
          selector: (row) => row.picture_url,
          sortable: true,
          wrap: true,
        },
        {
          name: 'device id',
          selector: (row) => row.device[0].device_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'description id',
          selector: (row) => row.device[0].description,
          sortable: true,
          wrap: true,
        },
        {
          name: 'coordinates-latitude',
          selector: (row) => row.device[0].coordinates.latitude,
          sortable: true,
          wrap: true,
        },
        {
          name: 'coordinates-longitude',
          selector: (row) => row.device[0].coordinates.longitude,
          sortable: true,
          wrap: true,
        },
        {
          name: 'name',
          selector: (row) => row.device[0].name,
          sortable: true,
          wrap: true,
        },
        {
          name: 'status',
          selector: (row) => row.device[0].status,
          sortable: true,
          wrap: true,
        },
        {
          name: 'case_id',
          selector: (row) => row.device[0].case_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'identifier_token',
          selector: (row) => row.identifier_token,
          sortable: true,
          wrap: true,
        },
        {
          name: 'wearout',
          selector: (row) => row.wearout,
          sortable: true,
          wrap: true,
        },
        {
          name: 'history_hash',
          selector: (row) => row.history_hash,
          sortable: true,
          wrap: true,
        },
        {
          name: 'window_hash',
          selector: (row) => row.window_hash,
          sortable: true,
          wrap: true,
        },
        {
          name: 'is_certificate',
          selector: (row) => JSON.stringify(row.is_certificate),
          sortable: true,
          wrap: true,
        },
      ]

    const getDeviceKey = async () => {
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
                <p>{isError}</p>
            </div>

            <div className="checkbox">
                <input type="checkbox"
                    className='checkboxHistory'
                    onChange={(e) => seIsHistory(e.target.checked)}
                />
                <label>Show History</label>
            </div>

            <p>{isError}</p>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsDeviceKey} setDataTableFormat={setDataTableFormat} />
        </>


    )
}
