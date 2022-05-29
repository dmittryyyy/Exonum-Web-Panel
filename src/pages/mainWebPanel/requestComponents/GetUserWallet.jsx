import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/NodeAPI';
import { columnsUserWallet } from '../ColumnsTable';

export const GetUserWallet = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const GetUserWallet = async () => {
        try {
            if (testHash(isValueSearch)) {
                await searchUserWallet(client.activeNode, isValueSearch)
                    .then((wallet) => {
                        setDataJsonFormat(wallet.data);
                        setDataTableFormat([wallet.data]);
                    });
            } else {
                setDataJsonFormat('Key wallet uncorrect or empty input field!');
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
                    <input placeholder='Enter user wallet'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={GetUserWallet}>Search</button>
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
                                    columns={columnsUserWallet}
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
