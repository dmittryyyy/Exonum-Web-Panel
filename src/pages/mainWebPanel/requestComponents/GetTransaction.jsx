import { React, useContext, useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/NodeAPI';
import { columnsTransaction } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetTransaction = () => {

  const { client } = useContext(ThemeContext);

  const [isValueSearch, setIsValueSearch] = useState('');
  const [tableSearchValue, setTableSearchValue] = useState('');
  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();

  const testHash = (str) => {
    return /^[A-F0-9]+$/i.test(str);
  };

  const getTransaction = async () => {
    try {
      if (testHash(isValueSearch)) {
        const resp = await searchTransaction(client.activeNode, isValueSearch);
        if (!resp) {
          setDataJsonFormat('type: unknown')
        } else if (resp.type === 'committed') {
          delete resp.location_proof
          setDataJsonFormat(resp);
          setDataTableFormat([resp]);
        } else if (resp.type === 'in-pool') {
          delete resp.status
          delete resp.content.debug
          delete resp.location
          delete resp.location_proof
          setDataJsonFormat(resp);
        }
      } else {
        setDataJsonFormat('The entered string does not match hex');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect = () => {
  //   setIsValueSearch(localStorage.getItem(isValueSearch, isValueSearch));
  //   try {
  //     if (testHash(isValueSearch)) {
  //       const resp = searchTransaction(client.activeNode, isValueSearch);
  //       if (!resp) {
  //         setDataJsonFormat('type: unknown')
  //       } else if (resp.type === 'committed') {
  //         delete resp.location_proof
  //         setDataJsonFormat(resp);
  //         setDataTableFormat([resp]);
  //       } else if (resp.type === 'in-pool') {
  //         delete resp.status
  //         delete resp.content.debug
  //         delete resp.location
  //         delete resp.location_proof
  //         setDataJsonFormat(resp);
  //       }
  //     } else {
  //       setDataJsonFormat('The entered string does not match hex');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const ExpandedComponent = (dataTableFormat) => {
    return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
  }

  return (

    <>
      <div className="searchWrapper">
        <div className='search'>
          {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
          <input placeholder='Enter transaction number'
            value={isValueSearch}
            onChange={(e) => setIsValueSearch(e.target.value)} />
        </div>
        <button onClick={getTransaction}>Search</button>
      </div>

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
                  columns={columnsTransaction}
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
                        {tableSearchValue && <span className='clearInput' onClick={() => setTableSearchValue('')}>X</span>}
                        <input type='text'
                          placeholder='Search here'
                          className='form-control'
                          value={tableSearchValue}
                          onChange={(e) => setTableSearchValue(e.target.value)}
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
