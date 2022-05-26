import { React } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { columnsShop } from './columsTable/ColumnsTable';

export const ContentSapTest = ({ jsonFormat, shopItemsTable, eventsTable }) => {

  return (
    <div className='resultSearch'>

    <div className='resultWrapper'>
    {jsonFormat ? 
    <Accordion default-key="0">
    <Accordion.Item eventKey='0'>
      <Accordion.Header>JSON Format</Accordion.Header>
      <Accordion.Body>
      <pre className={'Error'}>{jsonFormat}</pre>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey='1'>
      <Accordion.Header>Table Format</Accordion.Header>
      <Accordion.Body>
      <DataTable 
          columns={columnsShop}
          data={shopItemsTable}
          pagination
          fixedHeader
          progressComponent={<CustomLoader />}
          highlightOnHover
          subHeader/>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion> 
   : ''}
    </div>
    </div>

  )
}
