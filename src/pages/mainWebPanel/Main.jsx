import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Node } from './Node';
import { SearchingBar } from './SearchingBar';
import { SearchingInput } from './SearchingInput';
import { CatalogTable } from './requestComponents/showCatalog/CatalogTable';


export const Main = ({ isheight, isActive }) => {

    const [jsonCatalog, setJsonCatalog] = useState();
    const [tableCatalog, setTableCatalog] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    return (
        <>

            <div className="navBlock">
                <SearchingBar
                    jsonCatalog={jsonCatalog}
                    navBarItem={navBarItem}
                    setNavBarItem={setNavBarItem}
                    setJsonCatalog={setJsonCatalog}
                    setTableCatalog={setTableCatalog}
                />

                <div className='rightNavBlock'>
                <Node
                    isActive={isActive}
                    isheight={isheight}
                />

                <SearchingInput navBarItem={navBarItem}/>

                <CatalogTable dataJsonFormat={jsonCatalog} dataTableFormat={tableCatalog}/>
                </div>

            </div>

        </>
    )
}
