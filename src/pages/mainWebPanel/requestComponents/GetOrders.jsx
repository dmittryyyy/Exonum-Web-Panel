import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/NodeAPI';
import { columnsOrders } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetOrders = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  const [isValueSearch, setIsValueSearch] = useState('');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();
  const [columnsTable, setColumnsTable] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const GetOrders = async () => {
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

  return (

    <>
      <div className="searchWrapper">
        <div className={classInput}>
          {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
          <input placeholder='Orders search'
            value={isValueSearch}
            onChange={(e) => setIsValueSearch(e.target.value)} />
        </div>
        <button onClick={GetOrders}>Search</button>
        <p>{isError}</p>
      </div>

      <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
    </>

  )
}
