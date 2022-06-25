import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../../components/navBar/NavBar';
import { ActiveAPI } from './ActiveAPI';

import './SapExplorer.scss';

export const SapExplorer = ({ isMenu }) => {

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="mainContent">

                <NavBar
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    isMenu={isMenu}
                />

                <div className={isMenu ? 'mainContentRight' : 'mainContentRightCloseMenu'}>

                    <ActiveAPI/>

                    <Outlet />

                </div>

            </div>

        </>
    )
}
