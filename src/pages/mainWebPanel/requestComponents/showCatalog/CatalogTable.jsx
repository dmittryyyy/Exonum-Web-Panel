import { React, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { columnsCatalog } from '../../ColumnsTable';

export const CatalogTable = ({ dataJsonFormat, dataTableFormat }) => {

    const [tableSearchValue, setTableSearchValue] = useState('');

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
                            <pre className={'isError'}>{JSON.stringify(dataJsonFormat, null, 2)}</pre>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>Table Format</Accordion.Header>
                        <Accordion.Body>
                            <DataTable
                                columns={columnsCatalog}
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
    )
}
