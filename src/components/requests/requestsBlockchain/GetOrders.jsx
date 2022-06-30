import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchOrders } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const GetOrders = ({ testHash }) => {

  const { client, columnsBlockchain } = useContext(ThemeContext);

  let { orders } = useParams();
  const navigate = useNavigate();

  const [isValueSearch, setIsValueSearch] = useState(orders ? orders : '');
  const [isDataOrders, setIsDataOrders] = useState();

  const [isError, setIsError] = useState('');
  const [classInput, setClassInput] = useState('search');

  const onGetOrders = async () => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          await searchOrders(client.activeNode, isValueSearch)
            .then((orders) => {
              if (!orders || orders === []) {
                setIsError('Data undefined!');
              }
              orders.data.map((elements) => {
                elements.status.splice(0, elements.status.length - 1);
                setIsDataOrders(orders.data);
              });
            });
          setIsError('');
          setClassInput('search');
          navigate(isValueSearch);
        } catch (e) {
          console.log(e);
          setIsError(`The data you entered is incorrect! ${e.message}`);
          setIsDataOrders('');
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
      onGetOrders();
    }
  }, []);

  return (

    <>
      <InputForRequest classInput={classInput} placeholder={'Search orders'}
      isError={isError} 
      isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
      request={onGetOrders}/>

      <RequestContent
        data={isDataOrders}
        columnsTable={columnsBlockchain.orders} />
    </>

  )
}
