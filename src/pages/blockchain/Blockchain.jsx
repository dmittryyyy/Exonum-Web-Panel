import { React, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { Node } from './Node';
import { NavBar } from '../../components/navBar/NavBar';
import { RequestContent } from '../../components/requestContent/RequestContent'


export const Blockchain = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="navBlock">
                <NavBar
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                    isMenu={isMenu}
                />

                <div className='rightNavBlock'>
                    <Node />

                    <Outlet />

                    <Routes>
                        <Route path='catalog' element={<RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} />} />
                    </Routes>

                </div>
            </div>
        </>
    )
}
