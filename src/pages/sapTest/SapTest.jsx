import React, { useState } from 'react';

import { SearchingSap } from './searchingSap';
import { ContentSapTest } from './ContentSapTest';
import { ShowVendingMachines } from './requestComponents/ShowVendingMachines';

import './SapTest.scss';

export const SapTest = () => {

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const hideTable = () => {
        setDataJsonFormat();
        setDataTableFormat();
      }


    return (
        <>
            <div className="searchBlock">

                <SearchingSap
                    setDataJsonFormat={setDataJsonFormat}
                    setDataTableFormat={setDataTableFormat}
                    setColumnsTable={setColumnsTable}
                />

            </div>

            <div className="buttonRequest">
                <ShowVendingMachines setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>
            </div>

            <div className="contentBlock">
                <ContentSapTest
                    dataJson={dataJsonFormat}
                    dataTable={dataTableFormat}
                    columnsTable={columnsTable}
                    hideTable={hideTable}
                />
            </div>
        </>
    )
}
