import { React, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import './RequestContent.scss';

export const RequestContent = ({ dataJsonFormat, dataTableFormat, columnsTable, setDataTableFormat }) => {

  const [isValueSearch, setIsValueSearch] = useState('');

  const ExpandedComponent = (dataTableFormat) => {
    return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
  }

  return (

    <div className='resultWrapper'>
      {dataJsonFormat ?
        <Accordion default-key="0">
          <Accordion.Item eventKey='0'>
            <Accordion.Header>JSON Format</Accordion.Header>
            <Accordion.Body>
              <pre className={'Error'}>{JSON.stringify(dataJsonFormat, null, 2)}</pre>
            </Accordion.Body>
          </Accordion.Item>
          {dataTableFormat ? <Accordion.Item eventKey='1'>
            <Accordion.Header>Table Format</Accordion.Header>
            <Accordion.Body>
              <DataTable
                columns={columnsTable}
                data={dataTableFormat}
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
}

