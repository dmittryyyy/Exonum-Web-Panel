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

  const [isLoading, setIsLoading] = useState(false);

  const onGetOrders = async (setErrorInput, setIsErrorRequest) => {
    if (isValueSearch) {
      if (testHash(isValueSearch)) {
        try {
          setIsLoading(true);
          await searchOrders(client.activeNode, isValueSearch)
            .then((orders) => {
              if (!orders || orders === []) {
                setErrorInput('Data undefined!');
              }
              orders.data.map((elements) => {
                elements.status.splice(0, elements.status.length - 1);
                setIsDataOrders(orders.data);
                setErrorInput('');
                setIsErrorRequest(false);
              });
            }); 
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
      }
    } else {
      setErrorInput('Empty search string!');
    }
  }

  useEffect(() => {
    if (isValueSearch) {
      onGetOrders();
    }
  }, []);

  return (

    <>
      <InputForRequest placeholder={'Search orders'}
      isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
      request={onGetOrders}/>

      <RequestContent
        data={isDataOrders}
        columnsTable={columnsBlockchain.orders} 
        isLoading={isLoading} />
    </>

  )
}
