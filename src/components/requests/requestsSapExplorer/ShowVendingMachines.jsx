import { React, useContext, useEffect, useState } from 'react';
import { Link, useParams, Routes, Route, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { getVendingMachines, getItemsLoaded, getShopItems } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const ShowVendingMachines = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { idMachines } = useParams();
    const navigate = useNavigate();

    const [isIdMachine, setIsIdMachine] = useState(idMachines ? idMachines : '');

    const [dataVendingmachine, setDataVendingMachine] = useState();
    const [isLoadedAndPrice, setIsLoadedAndPrice] = useState();
    const [isRequestsForAllMachines, setRequestsForAllMachines] = useState();

    const columnsVendingMachines = [
        {
            name: 'id',
            selector: (row) => <Link to={'item-loaded/' + isIdMachine} onClick={loadedAndPrice}>{row.id}</Link>,
            wrap: true,
            omit: false,
            compact: true,
        },
        {
            name: 'name',
            selector: (row) => row.name,
            wrap: true,
        },
        {
            name: 'description',
            selector: (row) => <Link to={'item-loaded/' + isIdMachine} onClick={loadedAndPrice}>{row.description}</Link>,
            wrap: true,
            compact: true,
        },
        {
            name: 'serialVendingNumber',
            selector: (row) => row.serialVendingNumber,
            wrap: true,
        },
        {
            name: 'blockchainKey',
            selector: (row) => row.blockchainKey,
            wrap: true,
            compact: true,
        },
        {
            name: 'type',
            selector: (row) => row.type,
            wrap: true,
            compact: true,
        },
        {
            name: 'condition',
            selector: (row) => row.condition,
            wrap: true,
            compact: true,
        },
        {
            name: 'lastConnectionTime',
            selector: (row) => row.lastConnectionTime,
            wrap: true,
            compact: true,
        },
        {
            name: 'lastEventDate',
            selector: (row) => row.lastEventDate,
            wrap: true,
            compact: true,
        },
        {
            name: 'userPublicKey',
            selector: (row) => row.userPublicKey,
            wrap: true,
        },
        {
            name: 'userPrivateKey',
            selector: (row) => row.userPrivateKey,
            wrap: true,
            compact: true,
        },
        {
            name: 'placeId',
            selector: (row) => row.placeId,
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

    const loadedAndPrice = async (e) => {
        let id;
        let data;
        if (isIdMachine) {
            id = isIdMachine;
        } else {
            let value = e.target.innerHTML;
            dataVendingmachine.some(item => {
                if (item.description === value) {
                    id = item.id;
                } else if (item.id === value) {
                    id = item.id;
                }
            });
        }

        setIsIdMachine(id);
        await getItemsLoaded(client.activeAPI + `/${'api'}`, id)
            .then(resp => {
                data = resp;
            });

        const shopItems = await getShopItems(client.activeAPI + `/${'external/api/v1'}`, '100');

        shopItems.forEach((shopItem) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === shopItem.name) {
                    data[i].price = shopItem.price;
                    data[i].category = shopItem.category;
                }
            }
        });
        setIsIdMachine(id)
        navigate('item-loaded/' + id);
        setIsLoadedAndPrice(data);
    }

    const requestsForAllMachines = async () => {
        const dataMachine = await getVendingMachines(client.activeAPI + `/${'api'}`);
        let data = [];
        let fullData = [];
        
        dataMachine.map(async item => {
            await getItemsLoaded(client.activeAPI + `/${'api'}`, item.id)
                .then(resp => {
                    data.push(resp);
                    console.log(resp)
                });
        });

        const shopItems = await getShopItems(client.activeAPI + `/${'external/api/v1'}`, '100');

        shopItems.forEach((shopItem) => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j].name === shopItem.name) {
                        data[i][j].price = shopItem.price;
                        data[i][j].category = shopItem.category;
                    }
                }
            }
        })
        data.some(item => {
            item.map(item => {
                fullData.push(item);
            })
        })
        navigate('allMachines');
        setRequestsForAllMachines(fullData);
    }

    useEffect(() => {
        if (window.location.href.indexOf('vending-machines') >= 0) {
            showVendingMachines();
        }
        if (isIdMachine) {
            loadedAndPrice();
        }
        if (window.location.href.indexOf('allMachines') >= 0) {
            requestsForAllMachines();
        }
    }, []);

    return (

        <>
            <NavBarForRelatedQueries requestsForAllMachines={requestsForAllMachines} />

            <RequestContent
                data={dataVendingmachine}
                columnsTable={columnsVendingMachines} />

            <Routes>
                <Route path='/' element={<RequestContent data={isLoadedAndPrice}
                    columnsTable={columnsSapExplorer.columnsItemsLoaded} />}>
                    <Route path='item-loaded/:idMachines' element={<RequestContent />} />
                </Route>

                <Route path='/' element={<RequestContent data={isRequestsForAllMachines}
                    columnsTable={columnsSapExplorer.columnsRequestsForAllMachines} />}>
                    <Route path=':allMachines' element={<RequestContent />} />
                </Route>

            </Routes>
        </>

    )
};
