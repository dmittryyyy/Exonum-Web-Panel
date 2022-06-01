import { React, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { Node } from './Node';
import { SearchingBar } from './SearchingBar';
import { ContentMain } from './ContentMain';


export const Main = ({ isheight, isActive }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>

            <div className="navBlock">
                <SearchingBar
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                />

                <div className='rightNavBlock'>
                <Node
                    isActive={isActive}
                    isheight={isheight}
                />

                <Outlet />

                <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} />
                </div>

            </div>

        </>
    )
}
