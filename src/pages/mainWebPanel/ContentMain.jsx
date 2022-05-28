import { React, useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';


export const ContentMain = ({ dataJsonFormat, dataTableFormat, setDataTableFormat, columnsTable, hideTable }) => {

  const [isValueSearch, setIsValueSearch] = useState();

  useEffect(() => {
    const result = dataJsonFormat?.filter(items => {
      return items.name.toLowerCase().match(isValueSearch.toLocaleLowerCase());
    });
    setDataTableFormat(result);
  }, [isValueSearch]);

  const ExpandedComponent = (dataTableFormat) => {
    return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
  }

  return (
    <>

      <div className='resultWrapper'>
        {dataJsonFormat ?
          <Accordion default-key="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header>JSON Format</Accordion.Header>
              <Accordion.Body>
                <pre className={'isError'}>{JSON.stringify(dataJsonFormat, null, 2)}</pre>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
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
                  subHeader
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
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          : ''}
      </div>

    </>
  )
}
