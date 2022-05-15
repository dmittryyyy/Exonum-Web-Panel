import { React, useContext, useState } from 'react';
import { Table } from 'react-bootstrap';

import { ThemeContext } from '../..';
import { getCatalog } from '../../services/webPanelAPI';

import './Content.scss';

export const Content = ({ isError, setIsResult, isResult, setIsError, GetOrders }) => {

  const { client } = useContext(ThemeContext);

  const [isKeys, isSetKeys] = useState([]);
  const [isValues] = useState([]);

  const showCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
      .then(orders => {
        orders.data.map(item => {
          isSetKeys(Object.keys(item));
          isValues.push(item);
        })
        setIsError('');
        setIsResult('')
      }) 
    } catch (error) {
      console.log(error);
      setIsResult('Catalog undefined or server error');
      setIsError('error');
    }
  }

  const getOrders = async () => {
    try {
      await getCatalog(client.activeNode)
      .then(orders => {
        orders.data.map(item => {
          isSetKeys(Object.keys(item));
          isValues.push(item);
        })
        setIsError('');
        setIsResult('')
      }) 
    } catch (error) {
      console.log(error);
      setIsResult('Catalog undefined or server error');
      setIsError('error');
    }
  }

  return (
    <div className='resultSearch'>

      <button type='submit' onClick={showCatalog}>Show Catalog</button>

     <pre className={isError}>{isResult}</pre>

      <Table striped bordered hover>
        <thead>
          <tr>
            {isKeys.map((item, index) =>
              <th key={index}>
                {item}
              </th>
              )}
          </tr>
        </thead>

        <tbody>
        {isValues?.map((item, index) =>
        <tr key={index}>
          {Object.values(item).map((item, index) => 
            <th key={index}>
              {item}
            </th>
            )}
        </tr>
        )}
        </tbody>

      </Table>

    </div>
  )
}
