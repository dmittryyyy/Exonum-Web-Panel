import { React, useContext, useState } from 'react';

import { ThemeContext } from '../..';
import { searchTransaction } from '../../services/webPanelAPI';
import { searchOrder } from '../../services/webPanelAPI';
import { searchService } from '../../services/webPanelAPI';
import { Content } from '../content/Content';

import './Search.scss';

export const Search = () => {

    const { client } = useContext(ThemeContext);

    const [isTransaction, setIsTransaction] = useState();
    const [isOrders, setIsOrders] = useState();
    const [isService, setIsService] = useState();

    const [isSearchResult, isSetSearchResult] = useState();

    const [isResult, setIsResult] = useState();

    const GetTransaction = async () => {
        if (testHash(isTransaction)) {
            isSetSearchResult(await searchTransaction(client.activeNode, isTransaction));
            if (!isSearchResult) {
                setIsResult('type: unknown')
            } else if (isSearchResult.type === 'committed') {
                delete isSearchResult.location_proof
                const message = isSearchResult.content.message.substring(0, 70) + '...';
                isSearchResult.content.message = message;
                setIsResult(JSON.stringify(isSearchResult, null, 1));
            } else if (isSearchResult.type === 'in-poll') {
                delete isSearchResult.status
                delete isSearchResult.content.debug
                delete isSearchResult.location
                delete isSearchResult.location_proof
                setIsResult(JSON.stringify(isSearchResult, null, 1));
            }
        } else {
            alert('Hash не соответствует hex ')
        }
    }

    const GetOrder = async () => {
        isSetSearchResult(await searchOrder(client.activeNode, isOrders));
        setIsResult(hexadecimal(isSearchResult.data.order_seller_part.items[0].application_data));
    }

    const GetService = async () => {
        isSetSearchResult(await searchService(client.activeNode, isService));
        setIsResult(JSON.stringify(isSearchResult.application_service_proof.to_application_service.entries[0].value, null, 2));
    }

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const hexadecimal = (byteArray) => {
        return Array.from(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    };

    return (
            <>
            <div className="searchBlock">
                <div className="searchTransactions">
                <div className={`search ${!GetTransaction ? 'searchError' : ''}`}>
                    {isTransaction && <span className='clearInput' onClick={() => setIsTransaction('')}>X</span>}
                    <input placeholder='Search transaction'
                        value={isTransaction}
                        onChange={(e) => setIsTransaction(e.target.value)} />
                </div>
                <button type='submit' onClick={GetTransaction}>Найти</button>
                </div>

                <div className="searchOrders">
                <div className={'search'}>
                    {isOrders && <span className='clearInput' onClick={() => setIsOrders('')}>X</span>}
                    <input placeholder='Search order'
                        value={isOrders}
                        onChange={(e) => setIsOrders(e.target.value)} />
                </div>
                <button type='submit' onClick={GetOrder}>Найти</button>
                </div>

                <div className="searchServiceApplication">
                <div className={'search'}>
                    {isService && <span className='clearInput' onClick={() => setIsService('')}>X</span>}
                    <input placeholder='ServiceApplication'
                        value={isService}
                        onChange={(e) => setIsService(e.target.value)} />
                </div>
                <button type='submit' onClick={GetService}>Найти</button>
                </div>
            </div>

            <Content
            isResultTransaction={isResult}
            />
            </>
    )
}
