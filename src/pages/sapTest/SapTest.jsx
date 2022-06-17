import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { NavBar } from '../../components/navBar/NavBar';
import { ActiveAPI } from './ActiveAPI';
import { RequestContent } from '../../components/requestContent/RequestContent';

export const SapTest = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="navBlock">

                <NavBar
                    setDataJsonFormat={setDataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                    dataJsonFormat={dataJsonFormat}
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    isMenu={isMenu}
                />

                <div className='rightNavBlock'>
                    <ActiveAPI/>

                    <Outlet />

                    <Routes>
                        <Route path='vending-machines' element={<RequestContent dataTableFormat={dataTableFormat} columnsTable={columnsTable} dataJsonFormat={dataJsonFormat} />}/>
                    </Routes>
                </div>

            </div>

        </>
    )
}
