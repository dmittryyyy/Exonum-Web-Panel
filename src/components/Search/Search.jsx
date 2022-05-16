import { React, useContext, useState } from 'react';

import { ThemeContext } from '../..';
import { searchTransaction, searchOrder, searchService, searchUserWallet, searchDeviceKey, searchOrders } from '../../services/webPanelAPI';
import { Content } from '../content/Content';

import './Search.scss';

export const Search = () => {

    const { client } = useContext(ThemeContext);

    const [isTransaction, setIsTransaction] = useState();
    const [isOrder, setIsOrder] = useState();
    const [isService, setIsService] = useState();
    const [isUserWallet, setIsUserWallet] = useState();
    const [isOrders, setIsOrders] = useState();

    const [isDeviceKey, setIsDeviceKey] = useState();
    const [isHistory, seIsHistory] = useState();

    const [isOrdersItems, setIsOrdersItems] = useState();

    const [isResult, setIsResult] = useState();
    const [isError, setIsError] = useState();

    const GetTransaction = async () => {
        try {
            if (testHash(isTransaction)) {
                const resp = await searchTransaction(client.activeNode, isTransaction);
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
            await searchOrder(client.activeNode, isOrder)
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
            await searchService(client.activeNode, isService)
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
            if (testHash(isUserWallet)) {
                await searchUserWallet(client.activeNode, isUserWallet)
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
            if (isDeviceKey) {
                await searchDeviceKey(client.activeNode, isDeviceKey, isHistory)
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
            if (testHash(isOrders)) {
                await searchOrders(client.activeNode, isOrders)
                    .then((orders) => {
                        orders.data.map(elements => {
                            elements.status.splice([0, elements.status.length - 1]);
                        })
                        setIsOrdersItems(orders.data);
                    });
                setIsError('');
            } else {
                setIsResult('Order number uncorrect or empty input field!');
                setIsError('error');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(isOrdersItems)
    }

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    return (
        <>
            <div className="searchBlock">
                <div className="searchTransactions">
                    <div className='search'>
                        {isTransaction && <span className='clearInput' onClick={() => setIsTransaction('')}>X</span>}
                        <input placeholder='Search transaction'
                            value={isTransaction}
                            onChange={(e) => setIsTransaction(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GetTransaction}>Найти</button>
                </div>

                <div className="searchOrder">
                    <div className='search'>
                        {isOrder && <span className='clearInput' onClick={() => setIsOrder('')}>X</span>}
                        <input placeholder='Search order'
                            value={isOrder}
                            onChange={(e) => setIsOrder(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GetOrder}>Найти</button>
                </div>

                <div className="searchServiceApplication">
                    <div className='search'>
                        {isService && <span className='clearInput' onClick={() => setIsService('')}>X</span>}
                        <input placeholder='ServiceApplication'
                            value={isService}
                            onChange={(e) => setIsService(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GetService}>Найти</button>
                </div>
            </div>


            <div className="searchBlock2">
                <div className="searchUserWallet">
                    <div className='search'>
                        {isUserWallet && <span className='clearInput' onClick={() => setIsUserWallet('')}>X</span>}
                        <input placeholder='Search user wallet'
                            value={isUserWallet}
                            onChange={(e) => setIsUserWallet(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GetUserWallet}>Найти</button>
                </div>

                <div className="searchDeviceKey">
                    <div className='search'>
                        {isDeviceKey && <span className='clearInput' onClick={() => setIsDeviceKey('')}>X</span>}
                        <input placeholder='Search device key'
                            value={isDeviceKey}
                            onChange={(e) => setIsDeviceKey(e.target.value)}
                        />
                    </div>
                    <button type='submit' onClick={GetDeviceKey}>Найти</button>

                    <div className="checkbox">
                        <input type="checkbox"
                            className='checkboxHistory'
                            onChange={(e) => seIsHistory(e.target.checked)}
                        />
                        <label>Show History</label>
                    </div>
                </div>

                <div className="searchOrders">
                    <div className='search'>
                        {isOrders && <span className='clearInput' onClick={() => setIsOrders('')}>X</span>}
                        <input placeholder='Search orders users'
                            value={isOrders}
                            onChange={(e) => setIsOrders(e.target.value)} />
                    </div>
                    <button type='submit' onClick={GetOrders}>Найти</button>
                </div>

            </div>

            <Content
                isResult={isResult}
                setIsResult={setIsResult}
                isError={isError}
                setIsError={setIsError}
                isOrdersItems={isOrdersItems}
            />

        </>
    )
}
