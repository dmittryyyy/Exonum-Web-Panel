import React, { useState } from 'react';

import { SearchingSap } from './SearchingSap';
import { ContentSapTest } from './ContentSapTest';
import { SearchingInput } from './SearchingInput';


export const SapTest = () => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="navBlock">

                <SearchingSap
                    setDataJsonFormat={setDataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                    dataJsonFormat={dataJsonFormat}
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                />

                <div className='rightNavBlock'>

                    <SearchingInput
                        setDataJsonFormat={setDataJsonFormat}
                        setDataTableFormat={setDataTableFormat}
                        setColumnsTable={setColumnsTable}
                        navBarItem={navBarItem}
                    />
                </div>

            </div>

            <ContentSapTest
                dataJson={dataJsonFormat}
                dataTable={dataTableFormat}
                columnsTable={columnsTable}
            />

        </>
    )
}
