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

  const [isLoading, setIsLoading] = useState(false);

  const onGetTransaction = async (setErrorInput, setIsErrorRequest) => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          setIsLoading(true);
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
          setErrorInput('');
          setIsErrorRequest(false);
          navigate(isValueSearch);
        } catch (e) {
          console.log(e);
          setErrorInput(`The data you entered is incorrect! ${e.message}`);
          if (e.response.status >= 500) {
            setErrorInput('Unexpected error, please try again later...');
          }
          setIsErrorRequest(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setErrorInput('Not a HEX string');
        setIsErrorRequest(false);
      }
    } else {
      setErrorInput('Empty search string!');
      setIsErrorRequest(false);
    }
  }

  useEffect(() => {
    if (isValueSearch) {
      onGetTransaction();
    }
  }, []);

  return (
    <>
      <InputForRequest placeholder={'Enter transaction number'}
        isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
        request={onGetTransaction}/>

      <RequestContent
        isLoading={isLoading}
        data={isDataTransaction}
        columnsTable={columnsBlockchain.transaction} />
    </>
  )
}
