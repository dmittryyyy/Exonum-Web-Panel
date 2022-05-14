import { React, useContext } from 'react';

import { ThemeContext } from '../..';
import { getCatalog } from '../../services/webPanelAPI';

import './Content.scss';

export const Content = ({ isError, setIsResult, isResult, setIsError }) => {

  const { client } = useContext(ThemeContext);

  const showCatalog = async () => {
    try {
        await getCatalog(client.activeNode)
            .then((orders) => {
              orders.data.map((item) => {
               console.log(Object.values(item));
              })
                setIsResult(JSON.stringify(orders, null, 1));
            });
        setIsError('');
    } catch (error) {
        console.log(error);
        setIsResult('Catalog undefined or server error');
        setIsError('error');
    }
}

  return (
    <div className='resultSearch'>

      <>
      <button type='submit' onClick={showCatalog}>Show Catalog</button>

      <pre className={isError}>{isResult}</pre>
      </>

      <table className='table'>
        <thead>
          <tr>
            <th>application_service_id</th>
            <th>window_hash</th>
            <th>url</th>
            <th>case</th>
            <th>name</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>fccb84958ce96067018b7d6e2732f01d931d4568ca45ae6437fc10a0d7f69d6a</th>
            <th>0136a659609f506943291fe821e3f0a927dc3e57494ab5b9e8a9d1fca3af0822</th>
            <th>https://roteks.sveklapay.com/vending/75ca7ebd-fd16-41af-8373-696886000222</th>
            <th>8c1d6f675523a6db4d3f5f9b178f104f4c722521c12adb390de73a5a0063e648</th>
            <th>10. НЛМК Цех металлических конструкций</th>
            <th>'вендинг'</th>
          </tr>
        </tbody>
      </table>

    </div>
  )
}
