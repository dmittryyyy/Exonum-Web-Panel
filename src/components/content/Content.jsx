import { React, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../..';
import { getCatalog } from '../../services/webPanelAPI';

import './Content.scss';

export const Content = ({ isError, isResult, isItemsCatalog, isOrdersItems, pending, filteredOrders,
  setIsResult, setIsError, isSetItemsCatalog, setIsOrdersItems, setPending, setFilteredOrders }) => {

  const { client } = useContext(ThemeContext);

  const [searchCatalog, setSearchCatalog] = useState('');
  const [searchOrders, setSearchOrders] = useState('');

  const [filteredCatalog, setFilteredCatalog] = useState();

//Button Catalog
  const [hideId, setHideId] = useState(false);
  const [hideCase, setHideCase] = useState(false);
  const [hideName, setHideName] = useState(false);
  const [hideTags, setHideTags] = useState(false);
  const [hideURL, setHideURL] = useState(false);
  const [hideHash, setHideHash] = useState(false);

//Button Orders
  const [hideService, setHideService] = useState(false);
  const [hideClientId, setHideClientId] = useState(false);
  const [hideTime, setHideTime] = useState(false);
  const [hideCurrency, setHideCurrency] = useState(false);
  const [hideNumber, setHideNumber] = useState(false);
  const [hideForward, setHideForward] = useState(false);
  const [hideOrder, setHideOrder] = useState(false);
  const [hideDescr, setHideDescr] = useState(false);
  const [hideOrderId, setHideOrderId] = useState(false);
  const [hideSeller, setHideSeller] = useState(false);
  const [hideStatus, setHideStatus] = useState(false);
  const [hideUpdate, setHideUpdate] = useState(false);
  const [hideUser, setHideUser] = useState(false);
  const [isHideHash, setIsHideHash] = useState(false);

  const ShowCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          isSetItemsCatalog(items.data);
          setFilteredCatalog(items.data);
        })
      setIsResult('');
    } catch (error) {
      console.log(error);
      setIsResult('Catalog undefined or server error');
      setIsError('error');
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (isItemsCatalog) {
      const result = isItemsCatalog.filter(items => {
        return items.name.toLowerCase().match(searchCatalog.toLocaleLowerCase());
      });
      setFilteredCatalog(result);
    }
  }, [searchCatalog]);

  useEffect(() => {
    if (isOrdersItems) {
      const result = isOrdersItems.filter(items => {
        return items.order_description.toLowerCase().match(searchOrders.toLocaleLowerCase());
      });
      setFilteredOrders(result);
    }
  }, [searchOrders]);


  const hideTable = () => {
    isSetItemsCatalog();
    setIsOrdersItems();
  }


  const clearInputFilter = () => {
    setSearchCatalog('');
    setSearchOrders('');
  }

  const columnsCatalog = [
    {
      name: 'id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true,
      omit: hideId,
    },
    {
      name: 'Case',
      selector: (row) => row.case,
      sortable: true,
      wrap: true,
      omit: hideCase,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      omit: hideName,
    },
    {
      name: 'Tags',
      selector: row => row.tags,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
      omit: hideTags,
    },
    {
      name: 'URL',
      selector: (row) => row.url,
      sortable: true,
      wrap: true,
      omit: hideURL,
    },
    {
      name: 'Hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true,
      omit: hideHash,
    },
  ]

  const columnsOrders = [
    {
      name: 'service id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true,
      omit: hideService,
    },
    {
      name: 'client id',
      selector: (row) => row.client_id,
      sortable: true,
      wrap: true,
      omit: hideClientId,
    },
    {
      name: 'time',
      selector: (row) => row.creation_time,
      sortable: true,
      wrap: true,
      omit: hideTime,
    },
    {
      name: 'currency',
      selector: (row) => row.currency,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
      omit: hideCurrency,
    },
    {
      name: 'number',
      selector: (row) => row.external_number,
      sortable: true,
      wrap: true,
      omit: hideNumber,
    },
    {
      name: 'forward agent',
      selector: (row) => row.forward_agent,
      sortable: true,
      wrap: true,
      omit: hideForward,
    },
    {
      name: 'order amount',
      selector: (row) => row.order_amount,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
      omit: hideOrder,
    },
    {
      name: 'description',
      selector: (row) => row.order_description,
      sortable: true,
      wrap: true,
      omit: hideDescr,
    },
    {
      name: 'order id',
      selector: (row) => row.order_id,
      sortable: true,
      wrap: true,
      omit: hideOrderId,
    },
    {
      name: 'seller id',
      selector: (row) => row.seller_id,
      sortable: true,
      wrap: true,
      omit: hideSeller,
    },
    {
      name: 'status',
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
      omit: hideStatus,
    },
    {
      name: 'time update',
      selector: (row) => row.time_for_update,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
      omit: hideUpdate,
    },
    {
      name: 'user id',
      selector: (row) => row.user_id,
      sortable: true,
      wrap: true,
      omit: hideUser,
    },
    {
      name: 'hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true,
      omit: isHideHash,
    },
  ]

  return (
    <div className='resultSearch'>

      <button className='btnShowCatalog' type='submit' onClick={ShowCatalog}>Show Catalog</button>
      <button className='btnShowCatalog' type='submit' onClick={hideTable}>Hide Table</button>

      <pre className={isError}>{isResult}</pre>

      <div className={isItemsCatalog || isOrdersItems ? 'tableWrapper' : 'tableHidden'}>  

        <DataTable
          title='Orders'
          columns={isItemsCatalog ? columnsCatalog : columnsOrders}
          data={isItemsCatalog ? filteredCatalog : filteredOrders}
          pagination
          fixedHeader
          progressPending={pending}
          progressComponent={<CustomLoader />}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <div className='headerWrapper'>
            <div className='search'>
              {searchCatalog || searchOrders ? <span className='clearInput' onClick={clearInputFilter}>X</span> : ''}
              <input type='text'
                placeholder='Search here'
                className='form-control'
                value={isItemsCatalog ? searchCatalog : searchOrders}
                onChange={isItemsCatalog ? (e) => setSearchCatalog(e.target.value) : (e) => setSearchOrders(e.target.value)}
              />
            </div>

           {isItemsCatalog ? 
           <div className='buttonWrapperCatalog'>
           <Button onClick={() => setHideId(!hideId)}>Hide Id</Button>
           <Button onClick={() => setHideCase(!hideCase)}>Hide Case</Button>
           <Button onClick={() => setHideName(!hideName)}>Hide Name</Button>
           <Button onClick={() => setHideTags(!hideTags)}>Hide Tags</Button>
           <Button onClick={() => setHideURL(!hideURL)}>Hide URL</Button>
           <Button onClick={() => setHideHash(!hideHash)}>Hide Hash</Button>
           </div> 
          : 
          <div className='buttonWrapperOrders'>
           <Button onClick={() => setHideService(!hideService)}>Hide Srvice</Button>
           <Button onClick={() => setHideClientId(!hideClientId)}>Hide Client</Button>
           <Button onClick={() => setHideTime(!hideTime)}>Hide Time</Button>
           <Button onClick={() => setHideCurrency(!hideCurrency)}>Hide Currency</Button>
           <Button onClick={() => setHideNumber(!hideNumber)}>Hide Number</Button>
           <Button onClick={() => setHideForward(!hideForward)}>Hide Forward</Button>
           <Button onClick={() => setHideOrder(!hideOrder)}>Hide Order</Button>
           <Button onClick={() => setHideDescr(!hideDescr)}>Hide Descr</Button>
           <Button onClick={() => setHideOrderId(!hideOrderId)}>Hide Order Id</Button>
           <Button onClick={() => setHideSeller(!hideSeller)}>Hide Seller</Button>
           <Button onClick={() => setHideStatus(!hideStatus)}>Hide Status</Button>
           <Button onClick={() => setHideUpdate(!hideUpdate)}>Hide Update</Button>
           <Button onClick={() => setHideUser(!hideUser)}>Hide User</Button>
           <Button onClick={() => setIsHideHash(!isHideHash)}>Hide Hash</Button>
           </div> 
           }

            </div>
          }
          subHeaderAlign='center'
        />
      </div>

    </div>
  )
}
