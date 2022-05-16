import { React, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';

import { ThemeContext } from '../..';
import { getCatalog } from '../../services/webPanelAPI';

import './Content.scss';

export const Content = ({ isError, setIsResult, isResult, setIsError, isOrdersItems }) => {

  const { client } = useContext(ThemeContext);

  const [isItemsCatalog, isSetItemsCatalog] = useState();

  const showCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          isSetItemsCatalog(items.data);
        })
    } catch (error) {
      console.log(error);
      setIsResult('Catalog undefined or server error');
      setIsError('error');
    }
  }

  const columnsCatalog = [
    {
      name: 'id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true
    },
    {
      name: 'case',
      selector: (row) => row.case,
      sortable: true,
      wrap: true
    },
    {
      name: 'name',
      selector: (row) => row.name,
      sortable: true,
      wrap: true
    },
    {
      name: 'tags',
      selector: row => row.tags,
      sortable: true,
      wrap: true,
      maxWidth: '50px'
    },
    {
      name: 'url',
      selector: (row) => row.url,
      sortable: true,
      wrap: true
    },
    {
      name: 'hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true
    },
  ]

  const columnsOrders = [
    {
      name: 'service id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'client id',
      selector: (row) => row.client_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'time',
      selector: (row) => row.creation_time,
      sortable: true,
      wrap: true,
    },
    {
      name: 'currency',
      selector: (row) => row.currency,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'number',
      selector: (row) => row.external_number,
      sortable: true,
      wrap: true,
    },
    {
      name: 'forward agent',
      selector: (row) => row.forward_agent,
      sortable: true,
      wrap: true,
    },
    {
      name: 'order amount',
      selector: (row) => row.order_amount,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'description',
      selector: (row) => row.order_description,
      sortable: true,
      wrap: true,
    },
    {
      name: 'order id',
      selector: (row) => row.order_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'seller id',
      selector: (row) => row.seller_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'status',
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
    },
    {
      name: 'time update',
      selector: (row) => row.time_for_update,
      sortable: true,
      wrap: true,
      maxWidth: '50px'
    },
    {
      name: 'user id',
      selector: (row) => row.user_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true,
    },
  ]

  return (
    <div className='resultSearch'>

      <button type='submit' onClick={showCatalog}>Show Catalog</button>

      <pre className={isError}>{isResult}</pre>

      <div className={isItemsCatalog ? '' : 'tableHidden'}>
        <DataTable
        className='dataTable'
          title='Catalog'
          columns={columnsCatalog}
          data={isItemsCatalog}
          pagination
          fixedHeader
          highlightOnHover
        />
      </div>

      <div className={isOrdersItems ? '' : 'tableHidden'}>
        <DataTable
        title='Orders'
          columns={columnsOrders}
          data={isOrdersItems}
          pagination
          fixedHeader
          highlightOnHover
        />
      </div>

    </div>
  )
}
