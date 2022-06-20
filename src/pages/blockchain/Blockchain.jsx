import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Node } from './Node';
import { NavBar } from '../../components/navBar/NavBar';

export const Blockchain = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="navBlock">
                <NavBar
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    isMenu={isMenu}
                />

                <div className='rightNavBlock'>
                    <Node />

                    <Outlet />

                </div>
            </div>
        </>
    )
}
