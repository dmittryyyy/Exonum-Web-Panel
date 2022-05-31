import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../../../index';
import { searchService } from '../../../services/NodeAPI';

export const ServiceApplication = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const GetService = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchService(client.activeNode, isValueSearch)
                        .then((service) => {
                            setDataJsonFormat(service.application_service_proof.to_application_service.entries[0].value);
                            setDataTableFormat('');
                        });
                    setIsError('');
                } catch (error) {
                    console.log(error);
                    setDataJsonFormat('Key uncorrect or empty input field!');
                }
            } else {
                setIsError('Not a HEX string');
                setClassInput('searchError');
            }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    const ExpandedComponent = (dataTableFormat) => {
        return <pre>{JSON.stringify(dataTableFormat, null, 2)}</pre>;
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Service Application'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={GetService}>Search</button>
                <p>{isError}</p>
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
