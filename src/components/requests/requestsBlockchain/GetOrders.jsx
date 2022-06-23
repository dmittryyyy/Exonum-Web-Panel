import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';

export const GetOrders = ({ testHash }) => {

  const { client, columnsBlockchain } = useContext(ThemeContext);

  let { orders } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(orders ? orders : '');
  const [isDataOrders, setIsDataOrders] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const getOrders = async () => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          await searchOrders(client.activeNode, isValueSearch)
            .then((orders) => {
              orders.data.map((elements) => {
                elements.status.splice(0, elements.status.length - 1);
                setIsDataOrders(orders.data);
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


      <RequestContent
        data={isDataOrders}
        columnsTable={columnsBlockchain.orders} />
    </>

  )
}
