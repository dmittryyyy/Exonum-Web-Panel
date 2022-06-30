import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const GetTransaction = ({ testHash }) => {

  const { client, columnsBlockchain } = useContext(ThemeContext);

  let { transactionId } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(transactionId ? transactionId : '');
  const [isDataTransaction, setIsDataTransaction] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const onGetTransaction = async () => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          const resp = await searchTransaction(client.activeNode, isValueSearch);
          if (!resp || resp === undefined) {
            setIsDataTransaction('type: unknown');
          } else if (resp.type === 'committed') {
            delete resp.location_proof
            setIsDataTransaction([resp]);
          } else if (resp.type === 'in-pool') {
            delete resp.status
            delete resp.content.debug
            delete resp.location
            delete resp.location_proof
            setIsDataTransaction([resp]);
          };
          setIsError('');
          setClassInput('search');
          navigate(isValueSearch);
        } catch (e) {
          console.log(e);
          setIsError(`The data you entered is incorrect! ${e.message}`);
          setIsDataTransaction('');
          if (e.response.status >= 500) {
            setIsError('Unexpected error, please try again later...');
          }
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
      onGetTransaction();
    }
  }, []);

  return (

    <>
      <InputForRequest classInput={classInput} placeholder={'Enter transaction number'}
      isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
      request={onGetTransaction} 
      isError={isError} />

      <RequestContent
        data={isDataTransaction}
        columnsTable={columnsBlockchain.transaction} />
    </>

  )
}
