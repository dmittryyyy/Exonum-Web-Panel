import { React, useContext, useState } from 'react';

import { ThemeContext } from '../..';
import { searchTransaction, searchOrder, searchService, searchUserWallet, searchDeviceKey, searchOrders } from '../../services/webPanelAPI';
import { Content } from '../content/Content';
import { NavBar } from '../navBar/NavBar';

import './Search.scss';

export const Search = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState();
    const [isHistory, seIsHistory] = useState();

    const [isResult, setIsResult] = useState();
    const [isError, setIsError] = useState();

    const [isOrdersItems, setIsOrdersItems] = useState('');
    const [isItemsCatalog, isSetItemsCatalog] = useState();

    const [navBarItem, setNavBarItem] = useState([]);

    const [pending, setPending] = useState(true);

    const GetTransaction = async () => {
        try {
            if (testHash(isValueSearch)) {
                const resp = await searchTransaction(client.activeNode, isValueSearch);
                if (!resp) {
                    setIsResult('type: unknown')
                } else if (resp.type === 'committed') {
                    delete resp.location_proof
                    setIsResult(JSON.stringify(resp, null, 2));
                } else if (resp.type === 'in-poll') {
                    delete resp.status
                    delete resp.content.debug
                    delete resp.location
                    delete resp.location_proof
                    setIsResult(JSON.stringify(resp, null, 2));
                }
                setIsError('');
            } else {
                setIsResult('The entered string does not match hex');
                setIsError('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetOrder = async () => {
        try {
            await searchOrder(client.activeNode, isValueSearch)
                .then((orders) => {
                    setIsResult(hexadecimal((orders.data.order_seller_part.items[0].application_data)));
                });
            setIsError('');
        } catch (error) {
            console.log(error);
            setIsResult('Order number uncorrect or empty input field!');
            setIsError('error');
        }
    }

    const GetService = async () => {
        try {
            await searchService(client.activeNode, isValueSearch)
                .then((service) => {
                    setIsResult(JSON.stringify(service.application_service_proof.to_application_service.entries[0].value, null, 2));
                });
            setIsError('');
        } catch (error) {
            console.log(error);
            setIsResult('Key uncorrect or empty input field!');
            setIsError('error');
        }
    }

    const GetUserWallet = async () => {
        try {
            if (testHash(isValueSearch)) {
                await searchUserWallet(client.activeNode, isValueSearch)
                    .then((wallet) => {
                        setIsResult(JSON.stringify(wallet, null, 2));
                    });
                setIsError('');
            } else {
                setIsResult('Key wallet uncorrect or empty input field!');
                setIsError('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetDeviceKey = async () => {
        try {
            if (isValueSearch) {
                await searchDeviceKey(client.activeNode, isValueSearch, isHistory)
                    .then((wallet) => {
                        setIsResult(JSON.stringify(wallet, null, 2));
                    })
                setIsError('');
            } else {
                setIsResult('Device key undefined or empty input field!');
                setIsError('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetOrders = async () => {
        try {
            if (testHash(isValueSearch)) {
                await searchOrders(client.activeNode, isValueSearch)
                    .then((orders) => {
                        orders.data.map(elements => {
                            elements.status.splice([0, elements.status.length - 1]);
                            setIsOrdersItems(orders.data);
                        });
                    });
                isSetItemsCatalog('');
                setIsError('');
                setIsResult('');
                setPending()
            } else {
                setIsResult('Order number uncorrect or empty input field!');
                setIsError('error');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPending(false);
        }
        console.log(isOrdersItems);
    }

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    const renderPlaceholderInput = () => {
        if(navBarItem.id === 1) {
            return 'Enter transaction number'
        } else if(navBarItem.id === 2) {
            return 'Enter order number'
        } else if(navBarItem.id === 3) {
            return 'ServiceApplication'
        } else if(navBarItem.id === 4) {
            return 'Enter user wallet number'
        } else if(navBarItem.id === 5) {
            return 'Enter device key'
        } else if(navBarItem.id === 6) {
            return 'Orders users'
        } else {
            return 'Search...'
        }
    }

    const GiveCorrectFunction = () => {
        if(navBarItem.id === 1) {
           GetTransaction();
        } else if(navBarItem.id === 2) {
            GetOrder();
        } else if(navBarItem.id === 3) {
            GetService();
        } else if(navBarItem.id === 4) {
            GetUserWallet();
        } else if(navBarItem.id === 5) {
            GetDeviceKey();
        } else if(navBarItem.id === 6) {
            GetOrders();   
        } else if (navBarItem.id === undefined) {
            setIsResult('Choose search type!');
            setIsError('error');
        }
    }

    return (
        <>

            <div className="searchBlock">
                <NavBar
                    setNavBarItem={setNavBarItem}
                    navBarItem={navBarItem}
                />

                <div className="searchWrapper">
                    <div className='search'>
                        {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                        <input placeholder={renderPlaceholderInput()}
                            value={isValueSearch}
                            onChange={(e) => setIsValueSearch(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GiveCorrectFunction}>Найти</button>

                    {navBarItem.name === 'Search device key' ?
                    <div className="checkbox">
                        <input type="checkbox"
                            className='checkboxHistory'
                            onChange={(e) => seIsHistory(e.target.checked)}
                        />
                        <label>Show History</label>
                    </div>
                    : ''}
                </div>


            </div>

            <Content
                isResult={isResult}
                setIsResult={setIsResult}
                isError={isError}
                setIsError={setIsError}

                isOrdersItems={isOrdersItems}
                setIsOrdersItems={setIsOrdersItems}
                isSetItemsCatalog={isSetItemsCatalog}
                isItemsCatalog={isItemsCatalog}

                pending={pending}
                setPending={setPending}
            />

        </>
    )
}
