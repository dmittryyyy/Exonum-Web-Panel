import { React, useContext, useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';


import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/NodeAPI';
import { columnsTransaction } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetTransaction = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  const navigate = useNavigate();
  const data = useParams();

  const [isValueSearch, setIsValueSearch] = useState();
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();
  const [columnsTable, setColumnsTable] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  let { transactionId } = useParams();


  const getTransaction = async () => {
    setColumnsTable(columnsTransaction);
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
          <input placeholder='Enter transaction number'
            value={transactionId || isValueSearch}
            onChange={(e) => setIsValueSearch(e.target.value)} />
        </div>
        <h3>URL parameter: {transactionId}</h3>
        <button onClick={getTransaction}>Search</button>
        <p>{isError}</p>
      </div>

     <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
    </>

  )
}
