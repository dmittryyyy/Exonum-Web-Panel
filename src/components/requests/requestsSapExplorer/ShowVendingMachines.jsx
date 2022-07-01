import { React, useContext, useEffect, useState } from 'react';
import { Link, useParams, Routes, Route, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { getVendingMachines, getItemsLoaded, getShopItems } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { ErrorMessage } from '../../errorMessage/ErrorMessage';

export const ShowVendingMachines = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { idMachines } = useParams();
    const navigate = useNavigate();

    const [isIdMachine, setIsIdMachine] = useState(idMachines ? idMachines : '');

    const [dataVendingmachine, setDataVendingMachine] = useState();
    const [isLoadedAndPrice, setIsLoadedAndPrice] = useState();
    const [isRequestsForAllMachines, setRequestsForAllMachines] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState('');

    const columnsVendingMachines = [
        {
            name: 'id',
            selector: (row) => <Link to={'item-loaded/' + isIdMachine} onClick={onLoadedAndPrice}>{row.id}</Link>,
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
            selector: (row) => <Link to={'item-loaded/' + isIdMachine} onClick={onLoadedAndPrice}>{row.description}</Link>,
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

    const onShowVendingMachines = async () => {
        try {
            setIsLoading(true);
            await getVendingMachines(client.activeAPI + `/${'api'}`).then(resp => {
                if (!resp || resp === []) {
                    setIsError('Data undefined!')
                } else {
                    setDataVendingMachine(resp);
                    setIsError('');
                }
            });
        } catch (e) {
            console.log(e);
            setIsError(e.message);
            setDataVendingMachine('');
            if (e.response.status >= 500) {
                setIsError('Unexpected error, please try again later...');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const onLoadedAndPrice = async (e, idMachine) => {
        let id;
        let data;
        if (idMachine) {
            id = idMachine;
        } else {
            let value = e.target.innerHTML;
            dataVendingmachine.map((item) => {
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

        shopItems.map((shopItem) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === shopItem.name) {
                    data[i].price = shopItem.price;
                    data[i].category = shopItem.category;
                }
            }
        });
        setIsIdMachine(id)
        setIsLoadedAndPrice(data);
        navigate('item-loaded/' + id);
    }

    const onRequestsForAllMachines = async () => {
        const dataMachine = await getVendingMachines(client.activeAPI + `/${'api'}`);
        let data = [];
        let fullData = [];

        dataMachine.map(async item => {
            await getItemsLoaded(client.activeAPI + `/${'api'}`, item.id)
                .then(resp => {
                    data.push(resp);
                });
        });

        const shopItems = await getShopItems(client.activeAPI + `/${'external/api/v1'}`, '100');

        shopItems.map((shopItem) => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j].name === shopItem.name) {
                        data[i][j].price = shopItem.price;
                        data[i][j].category = shopItem.category;
                    }
                }
            }
        })
        data.map(item => {
            item.map(item => {
                fullData.push(item);
            })
        })
        navigate('item-loaded/allMachines');
        setRequestsForAllMachines(fullData);
    }

    useEffect(() => {
        if (window.location.href.indexOf('vending-machines') >= 0) {
            onShowVendingMachines();
        }
        if (isIdMachine) {
            onLoadedAndPrice(null, isIdMachine);
        }
        if (window.location.href.indexOf('allMachines') >= 0) {
            onRequestsForAllMachines();
        }
    }, [isIdMachine]);

    return (
        <>
            <NavBarForRelatedQueries
                requestsForAllMachines={<button className='list-queries-item'
                    onClick={onRequestsForAllMachines}>Requests for all machines</button>}
            />

            <ErrorMessage errorInput={isError}/>

            <RequestContent
                data={dataVendingmachine}
                columnsTable={columnsVendingMachines} isLoading={isLoading}/>

            <Routes>
                <Route path='item-loaded/' element={<RequestContent data={isLoadedAndPrice}
                    columnsTable={columnsSapExplorer.columnsItemsLoaded} title={'Data on chosen machine'}/>}>
                    <Route path=':idMachines' element={<RequestContent />} />
                </Route>

                <Route path='item-loaded/allMachines' element={<RequestContent data={isRequestsForAllMachines}
                    columnsTable={columnsSapExplorer.columnsRequestsForAllMachines} title={'Data on all machines'}/>}>
                    <Route path='' element={<RequestContent />} />
                </Route>
            </Routes>
        </>
    )
};
