import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Node } from './Node';
import { ContentMain } from './ContentMain';
import { SearchingBar } from './SearchingBar';
import { SearchingInput } from './SearchingInput';


export const Main = ({ isheight, isActive }) => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    const [isError, setIsError] = useState();

    return (
        <>

            <div className="navBlock">
                <SearchingBar
                    dataTableFormat={dataTableFormat}
                    navBarItem={navBarItem}
                    dataJsonFormat={dataJsonFormat}
                    setNavBarItem={setNavBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                />

                <div className='rightNavBlock'>
                <Node
                    isActive={isActive}
                    isheight={isheight}
                />

                <SearchingInput
                    navBarItem={navBarItem}
                    setDataJsonFormat={setDataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                />
                </div>

            </div>


            <>
                <ContentMain
                    dataJsonFormat={dataJsonFormat}
                    dataTableFormat={dataTableFormat}
                    setDataTableFormat={setDataTableFormat}
                    columnsTable={columnsTable}


                    isError={isError}
                    setIsError={setIsError}

                />
            </>

        </>
    )
}
