import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';
import { ThemeContext } from '../..';

import { getVendingMachines } from '../../services/SapTestAPI';


export const ContentSapTest = ({ isResult, setIsResult, isError }) => {

  const { client } = useContext(ThemeContext);

  const showVendingMachines = async () => {
    try {
      await getVendingMachines(client.venidngMachine).then(resp => {
        setIsResult(JSON.stringify(resp, null, 2));
    })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='resultSearch'>

    <button onClick={showVendingMachines}>Show VendingMachines</button>

    <div className='resultWrapper'>
    {isResult ? 
    <Accordion default-key="0">
    <Accordion.Item eventKey='0'>
      <Accordion.Header>JSON Format</Accordion.Header>
      <Accordion.Body>
      <pre className={isError}>{isResult}</pre>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey='1'>
      <Accordion.Header>Table Format</Accordion.Header>
      <Accordion.Body>
      <DataTable 
          title='Orders'
          // columns={}
          // data={}
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
