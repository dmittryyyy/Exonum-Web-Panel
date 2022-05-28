import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getUserSapInfo } from '../../../services/SapTestAPI';

export const UserSapInfo = ({ setDataJsonFormat, }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const userSapInfo = async () => {
        try {
            await getUserSapInfo(client.sveklaServerV1, isValueSearch)
                .then(resp => {
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

            <div className="searchWrapper">
                <div className='search'>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={userSapInfo}>Search</button>
            </div>
    )
}
