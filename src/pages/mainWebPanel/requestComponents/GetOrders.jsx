import { React, useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/NodeAPI';
import { columnsOrders } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetOrders = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  let { orders } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(orders ? orders : '');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();
  const [columnsTable, setColumnsTable] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const getOrders = async () => {
    setColumnsTable(columnsOrders);
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

      <Routes>
        <Route path={isValueSearch} element={<ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>}/>
      </Routes>
    </>

  )
}
