import { React, useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import CustomLoader from 'react-data-table-component';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/NodeAPI';
import { columnsUserWallet } from '../ColumnsTable';

export const GetUserWallet = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const GetUserWallet = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                            setDataJsonFormat(wallet.data);
                            setDataTableFormat([wallet.data]);
                        });
                        setIsError('');
                } catch (error) {
                    console.log(error);
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
                    <input placeholder='Enter user wallet'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={GetUserWallet}>Search</button>
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
