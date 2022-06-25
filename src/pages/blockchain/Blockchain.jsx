import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Node } from './Node';
import { NavBar } from '../../components/navBar/NavBar';

import './Blockchain.scss';

export const Blockchain = ({ isMenu }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>
            <div className="mainContent">

                <NavBar
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    dataJsonFormat={dataJsonFormat}
                    isMenu={isMenu}
                />

                <div className={isMenu ? 'mainContentRight' : 'mainContentRightCloseMenu'}>
                    
                    <Node />

                    <Outlet />

                </div>
            </div>
        </>
    )
}
