import { React } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

export const ContentSapTest = ({ dataJson, dataTable, columnsTable, hideTable }) => {

  return (
    <div className='resultSearch'>
      
      {dataJson || dataTable ?( 
    <button className='btnHideData' onClick={hideTable}>Hide data</button>  
      ):( 
   ''
   )}

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
                  pagination
                  fixedHeader
                  progressComponent={<CustomLoader />}
                  highlightOnHover
                  subHeader />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          : ''}
      </div>
    </div>

  )
}
