import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/BlockhainAPI';
import { columnsTransaction } from '../ColumnsTable';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const GetTransaction = ({ testHash }) => {

  const { client } = useContext(ThemeContext);

  let { transactionId } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(transactionId ? transactionId : '');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();
  const [columnsTable, setColumnsTable] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

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

      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />

    </>

  )
}
