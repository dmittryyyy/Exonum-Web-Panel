import { React, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

export const ContentSapTest = ({ dataJson, dataTable, columnsTable, setDataTableFormat}) => {

  const [isValueSearch, setIsValueSearch] = useState('');

  const ExpandedComponent = (dataTableFormat) => {
    return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
}

 useEffect(() => {
    const result = dataTable?.filter(items => {
      return items.name.toLowerCase().match(isValueSearch.toLocaleLowerCase());
    });
    setDataTableFormat(result);
  }, [isValueSearch]);

  return (

      <div className='resultWrapper'>
        {dataJson ?
          <Accordion default-key="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header>JSON Format</Accordion.Header>
              <Accordion.Body>
                <pre className={'Error'}>{dataJson}</pre>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Table Format</Accordion.Header>
              <Accordion.Body>
                <DataTable
                  columns={columnsTable}
                  data={dataTable}
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
            </Accordion.Item>
          </Accordion>
          : ''}
      </div>

  )
}
