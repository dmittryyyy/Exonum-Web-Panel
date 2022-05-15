import { React, useContext, useState } from 'react';
import { Table } from 'react-bootstrap';

import { ThemeContext } from '../..';
import { getCatalog } from '../../services/webPanelAPI';

import './Content.scss';

export const Content = ({ isError, setIsResult, isResult, setIsError, isOrdersValue, isOrdersKeys }) => {

  const { client } = useContext(ThemeContext);

  const [isKeysCatalog, isSetKeysCatalog] = useState([]);
  const [isValuesCatalog] = useState([]);

  const showCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
      .then(orders => {
        orders.data.map(item => {
          isSetKeysCatalog(Object.keys(item));
          isValuesCatalog.push(item);
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
            {isKeysCatalog.map((key, index) =>
              <th key={index}>
                {key}
              </th>
              )}
          </tr>
        </thead>

        <tbody>
        {isValuesCatalog?.map((items, index) =>
        <tr key={index}>
          {Object.values(items).map((value, index) => 
            <th key={index}>
              {value}
            </th>
            )}
        </tr>
        )}
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
          {isOrdersKeys?.map((key, index) =>
          <th key={index}>
            {key}
          </th>
          )}
          </tr>
        </thead>
           
        <tbody>
        {isOrdersValue?.map((items, index) =>
        <tr key={index}>
         {Object.values(items).map((value, index) => 
            <th key={index}>
              {JSON.stringify(value)}
            </th>
            )}
        </tr>
        )}
        </tbody>
      </Table>


    

    </div>
  )
}
