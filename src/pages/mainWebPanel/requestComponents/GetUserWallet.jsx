import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/NodeAPI';
import { columnsUserWallet } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetUserWallet = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const GetUserWallet = async () => {
        setColumnsTable(columnsUserWallet);
        try {
            if (testHash(isValueSearch)) {
                await searchUserWallet(client.activeNode, isValueSearch)
                    .then((wallet) => {
                        setDataJsonFormat(wallet.data);
                        setDataTableFormat([wallet.data]);
                    });
            } else {
                setDataJsonFormat('Key wallet uncorrect or empty input field!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Enter user wallet'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={GetUserWallet}>Search</button>
        </div>

    )
}
