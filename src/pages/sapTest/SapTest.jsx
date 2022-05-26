import React, { useState } from 'react';

import { SearchingSap } from './searchingSap';
import { ContentSapTest } from './ContentSapTest';
import { ShowVendingMachines } from './requestComponents/ShowVendingMachines';

import './SapTest.scss';

export const SapTest = () => {

    const [jsonFormat, setJsonFormat] = useState();

    const [shopItemsTable, setShopItemsTable] = useState();
    const [eventsTable, setEventsTable] = useState();

    return (
        <>
            <div className="searchBlock">

                <SearchingSap
                    setJsonFormat={setJsonFormat}

                    setShopItemsTable={setShopItemsTable}
                    setEventsTable={setEventsTable}
                    
                />

            </div>

            <div className="buttonRequest">
                <ShowVendingMachines setJsonFormat={setJsonFormat}/>
            </div>

            <div className="contentBlock">
                <ContentSapTest
                    jsonFormat={jsonFormat}
                    shopItemsTable={shopItemsTable}
                    eventsTable={eventsTable}
                />
            </div>
        </>
    )
}
