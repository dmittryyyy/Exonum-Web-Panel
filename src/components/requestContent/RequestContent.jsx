import { React, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';
import { observer } from 'mobx-react-lite';

import './RequestContent.scss';

export const RequestContent = observer(({ data, columnsTable }) => {

  const [isValueSearch, setIsValueSearch] = useState('');

  const ExpandedComponent = (data) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  return (
    <div className='resultWrapper'>
      {data ?
        <Accordion default-key="0">
          <Accordion.Item eventKey='0'>
            <Accordion.Header>JSON Format</Accordion.Header>
            <Accordion.Body>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Accordion.Body>
          </Accordion.Item>
          {columnsTable ? <Accordion.Item eventKey='1'>
            <Accordion.Header>Table Format</Accordion.Header>
            <Accordion.Body>
              <DataTable
                columns={columnsTable}
                data={data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                pagination
                fixedHeader
                progressComponent={<CustomLoader />}
                highlightOnHover
                subHeaderComponent={
                  <div className='tableHeader'>
                    <div className='search'>
                      {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                      <input type='text'
                        placeholder='Search here'
                        className='form-control'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)}
                      />
                    </div>
                  </div>}
                subHeader />
            </Accordion.Body>
          </Accordion.Item> : ''}
        </Accordion>
        : ''}
    </div>
  )
});

