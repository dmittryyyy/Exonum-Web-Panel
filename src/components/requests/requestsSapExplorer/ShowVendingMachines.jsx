import { React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { getVendingMachines, getItemsLoaded, getShopItems } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const ShowVendingMachines = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    const [dataVendingmachine, setDataVendingMachine] = useState();
    const [dataRelatedQueries, setDataRelatedQueries] = useState();

    const columnsVendingMachines = [
        {
            name: 'id',
            selector: (row) => <Link to='items-loaded' onClick={itemsLoaded}>{row.id}</Link>,
            sortable: true,
            wrap: true,
            omit: false
        },
        {
            name: 'name',
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'description',
            selector: (row) => <Link to='items-loaded' onClick={itemsLoaded}>{row.description}</Link>,
            sortable: true,
            wrap: true,
        },
        {
            name: 'serialNumber',
            selector: (row) => row.serialNumber,
            sortable: true,
            wrap: true,
        },
        {
            name: 'serialVendingNumber',
            selector: (row) => row.serialVendingNumber,
            sortable: true,
            wrap: true,
        },
        {
            name: 'blockchainKey',
            selector: (row) => row.blockchainKey,
            sortable: true,
            wrap: true,
        },
        {
            name: 'type',
            selector: (row) => row.type,
            sortable: true,
            wrap: true,
        },
        {
            name: 'condition',
            selector: (row) => row.condition,
            sortable: true,
            wrap: true,
        },
        {
            name: 'vendAnaliticaId',
            selector: (row) => row.vendAnaliticaId,
            sortable: true,
            wrap: true,
        },
        {
            name: 'lastConnectionTime',
            selector: (row) => row.lastConnectionTime,
            sortable: true,
            wrap: true,
        },
        {
            name: 'lastConnectionTimeout',
            selector: (row) => row.lastConnectionTimeout,
            sortable: true,
            wrap: true,
        },
        {
            name: 'lastEventDate',
            selector: (row) => row.lastEventDate,
            sortable: true,
            wrap: true,
        },
        {
            name: 'userPublicKey',
            selector: (row) => row.userPublicKey,
            sortable: true,
            wrap: true,
        },
        {
            name: 'userPrivateKey',
            selector: (row) => row.userPrivateKey,
            sortable: true,
            wrap: true,
        },
        {
            name: 'placeId',
            selector: (row) => row.placeId,
            sortable: true,
            wrap: true,
        },
    ];

    const showVendingMachines = async () => {
        try {
            await getVendingMachines(client.activeAPI + `/${'api'}`).then(resp => {
                setDataVendingMachine(resp);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (window.location.href.indexOf('vending-machines') >= 0) {
            showVendingMachines();
        }
    }, []);

    const itemsLoaded = async (e) => {
        let value = e.target.innerHTML;
        let id = '';
        let data;
        dataVendingmachine.some(item => {
            if (item.description === value) {
                id = item.id;
            } else if (item.id === value) {
                id = item.id;
            }
        })
        await getItemsLoaded(client.activeAPI + `/${'api'}`, id)
            .then(resp => {
                data = resp;
            });
            console.log(data)
           const shopItems = await getShopItems(client.activeAPI + `/${'external/api/v1'}`, '100');

           shopItems.forEach((shopItem) => {
            for(let i = 0; i < data.length; i++) {
                if(data[i].name === shopItem.name) {
                    data[i].price = shopItem.price;
                    data[i].category = shopItem.category;
                }
                setDataRelatedQueries(data)
            }
           })  
    }

    return (

        <>
        <NavBarForRelatedQueries/>

                <RequestContent
                    data={dataVendingmachine}
                    columnsTable={columnsVendingMachines} />

                <RequestContent
                    data={dataRelatedQueries}
                    columnsTable={columnsSapExplorer.itemsLoaded} />
        </>

    )
}
