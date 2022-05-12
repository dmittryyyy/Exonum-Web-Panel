import { React, useContext, useState } from 'react';

import { ThemeContext } from '../..';
import { searchTransaction } from '../../services/webPanelAPI';

import './Search.scss';

export const Search = () => {

    const { client } = useContext(ThemeContext);

    const [isSearchValue, setIsSearchValue] = useState();
    const [isSearchResult, isSetSearchResult] = useState();

    const [isResult, setIsResult] = useState();

    const onChangeInputValue = (e) => {
        setIsSearchValue(e.target.value);
    }

    const GetTransaction = async () => {
        if (testHash(isSearchValue)) {
            isSetSearchResult(await searchTransaction(client.activeNode, isSearchValue));
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
            }
        } else {

        }
    }

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    return (
        <main className='wrapper '>

            <div className="resultSearch">
                <pre>{isResult}</pre>
            </div>

            <div className="searchBlock">
                <div className={`search ${!testHash(isSearchValue) ? 'searchError' : ''}`}>
                    {isSearchValue && <span className='clearInput' onClick={() => setIsSearchValue('')}>X</span>}
                    <input placeholder='Hash'
                        value={isSearchValue}
                        onChange={onChangeInputValue} />
                </div>
                <button type='submit' onClick={GetTransaction}>Найти</button>
            </div>
        </main>
    )
}
