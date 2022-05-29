import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable  from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../../../index';
import { searchDeviceKey } from '../../../services/NodeAPI';
import { columnsDeviceKey } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetDeviceKey = ({ navBarItem }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [isHistory, seIsHistory] = useState();

    const getDeviceKey = async () => {
        try {
            if (isValueSearch) {
                await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                    .then((key) => {
                        setDataJsonFormat(key);
                        setDataTableFormat([key]);
                    })
            } else {
                setDataJsonFormat('Device key undefined or empty input field!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ExpandedComponent = (dataTableFormat) => {
        return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
      }

    return (
        <>
            <div className="searchWrapper">
                <div className='search'>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter device key'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={getDeviceKey}>Search</button>

                    <div className="checkbox">
                        <input type="checkbox"
                            className='checkboxHistory'
                            onChange={(e) => seIsHistory(e.target.checked)}
                        />
                        <label>Show History</label>
                    </div>
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
                                    columns={columnsDeviceKey}
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
