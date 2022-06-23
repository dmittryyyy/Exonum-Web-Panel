import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';

export const GetOrders = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  let { orders } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(orders ? orders : '');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const columnsOrders = [
    {
      name: 'service id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'client id',
      selector: (row) => row.client_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'time',
      selector: (row) => row.creation_time,
      sortable: true,
      wrap: true,
    },
    {
      name: 'currency',
      selector: (row) => row.currency,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'number',
      selector: (row) => row.external_number,
      sortable: true,
      wrap: true,
    },
    {
      name: 'forward agent',
      selector: (row) => row.forward_agent,
      sortable: true,
      wrap: true,
    },
    {
      name: 'order amount',
      selector: (row) => row.order_amount,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'description',
      selector: (row) => row.order_description,
      sortable: true,
      wrap: true,
    },
    {
      name: 'order id',
      selector: (row) => row.order_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'seller id',
      selector: (row) => row.seller_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'status',
      selector: (row) => JSON.stringify(row.status),
      sortable: true,
      wrap: true,
    },
    {
      name: 'time update',
      selector: (row) => row.time_for_update,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'user id',
      selector: (row) => row.user_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true,
    },
  ]

  const getOrders = async () => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          await searchOrders(client.activeNode, isValueSearch)
            .then((orders) => {
              orders.data.map((elements) => {
                elements.status.splice(0, elements.status.length - 1);
                setDataJsonFormat(orders.data);
                setDataTableFormat(orders.data);
              });
            });
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
      getOrders();
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
          <input placeholder='Orders search'
            value={isValueSearch}
            onChange={readValueInput} />
        </div>
        <button onClick={getOrders}>Search</button>
        <p>{isError}</p>
      </div>


      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsOrders} setDataTableFormat={setDataTableFormat} />
    </>

  )
}
