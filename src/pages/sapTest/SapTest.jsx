import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../../components/navBar/NavBar';
import { ActiveAPI } from './ActiveAPI';

export const SapTest = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="navBlock">

                <NavBar
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    isMenu={isMenu}
                />

                <div className='rightNavBlock'>
                    <ActiveAPI/>

                    <Outlet />

                </div>

            </div>

        </>
    )
}
