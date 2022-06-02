import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { SearchingSap } from './SearchingSap';
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

                    <Outlet />

                    <Routes>
                        <Route path='vending-machines' element={<ContentSapTest dataTableFormat={dataTableFormat} columnsTable={columnsTable} dataJsonFormat={dataJsonFormat} />}/>
                    </Routes>
                </div>

            </div>

        </>
    )
}
