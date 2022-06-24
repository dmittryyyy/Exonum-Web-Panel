import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../../components/navBar/NavBar';
import { NavBarForRelatedQueries } from '../../components/navBar/NavBarForRelatedQueries';
import { ActiveAPI } from './ActiveAPI';

import './SapExplorer.scss';

export const SapExplorer = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="mainContent">

                <NavBar
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    isMenu={isMenu}
                />

                <div className='mainContentRight'>

                    <ActiveAPI/>

                    <div>
                    <Outlet />

                    </div>
                </div>

            </div>

        </>
    )
}
