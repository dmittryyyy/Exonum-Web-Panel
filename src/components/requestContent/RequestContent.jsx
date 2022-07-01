import { React, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { observer } from 'mobx-react-lite';

import './RequestContent.scss';

export const RequestContent = observer(({ data, columnsTable, title, isLoading }) => {

  const [isShowData, setIsShowData] = useState(true);

  const ExpandedComponent = (data) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  return (
    <div className='resultWrapper' style={data && isShowData ? { backgroundColor: 'white' } : { backgrounColor: "none" }}>

      {data && isShowData ?
        <img className='hideData' src='images/hide.svg' onClick={() => setIsShowData(false)} />

        : data && !isShowData ?
          <img className='showData' src='images/show.svg' onClick={() => setIsShowData(true)} />

          : ''}

      {isLoading ?
        <div><img src="images/loadingData.gif" alt="loading" /></div>
        : ''}

      {data ?
        <Accordion default-key="0" className={isShowData ? '' : 'hiddenAccordion'}>
          {title ? <h4>{title}</h4> : ''}
          <Accordion.Item eventKey='0'>
            <Accordion.Header>JSON Format</Accordion.Header>
            <Accordion.Body>
              <pre>{JSON.stringify(data, null, 1)}</pre>
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
                highlightOnHover
                subHeader />
            </Accordion.Body>
          </Accordion.Item> : ''}
        </Accordion>
        : ''}
    </div>
  )
});

