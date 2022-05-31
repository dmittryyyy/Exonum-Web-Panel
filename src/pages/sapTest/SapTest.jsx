import React, { useState } from 'react';

import { SearchingSap } from './SearchingSap';
import { SearchingInput } from './SearchingInput';
import { ContentSapTest } from './ContentSapTest';


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

                    <ContentSapTest dataTableFormat={dataTableFormat} columnsTable={columnsTable} dataJsonFormat={dataJsonFormat}/>

                </div>

            </div>

        </>
    )
}
