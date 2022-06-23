import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const GetTransaction = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  let { transactionId } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(transactionId ? transactionId : '');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const columnsTransaction = [
    {
      name: 'type',
      selector: (row) => row.type,
      sortable: true,
      wrap: true,
    },
    {
      name: 'device_key_id',
      selector: (row) => row.content.debug.device_key_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'wearout',
      selector: (row) => row.content.debug.wearout,
      sortable: true,
      wrap: true,
    },
    {
      name: 'time',
      selector: (row) => row.content.debug.time,
      sortable: true,
      wrap: true,
    },
    {
      name: 'info',
      selector: (row) => JSON.stringify(row.content.debug.info[0], null, 2),
      sortable: true,
      wrap: true,
    },
    {
      name: 'message',
      selector: (row) => row.content.message,
      sortable: true,
      wrap: true,
    },
    {
      name: 'location-height',
      selector: (row) => JSON.stringify(row.location.block_height),
      sortable: true,
      wrap: true,
    },
    {
      name: 'location-position',
      selector: (row) => JSON.stringify(row.location.position_in_block),
      sortable: true,
      wrap: true,
    },
    {
      name: 'status',
      selector: (row) => JSON.stringify(row.status),
      sortable: true,
      wrap: true,
    },
  ]

  const getTransaction = async () => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          const resp = await searchTransaction(client.activeNode, isValueSearch);
          if (!resp) {
            setDataJsonFormat('type: unknown')
          } else if (resp.type === 'committed') {
            delete resp.location_proof
            setDataJsonFormat(resp);
            setDataTableFormat([resp]);
          } else if (resp.type === 'in-pool') {
            delete resp.status
            delete resp.content.debug
            delete resp.location
            delete resp.location_proof
            setDataJsonFormat(resp);
          };
          setIsError('');
          setClassInput('search');
          navigate(isValueSearch);
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsError('Not a HEX string');
        setClassInput('searchError');
      }
    } else {
      setIsError('Empty search string!');
      setClassInput('searchError');
    }
  }

  useEffect(() => {
    if (isValueSearch) {
      getTransaction();
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
          <input placeholder='Enter transaction number'
            value={isValueSearch}
            onChange={readValueInput} />
        </div>
        <button onClick={getTransaction}>Search</button>
        <p>{isError}</p>
      </div>

      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTransaction} setDataTableFormat={setDataTableFormat} />

    </>

  )
}
