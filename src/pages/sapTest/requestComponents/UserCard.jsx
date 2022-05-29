import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getUserCards } from '../../../services/SapTestAPI';
import { columnsUserCard } from '../ColumnsTable';

export const UserCard = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const usersCard = async () => {
        setColumnsTable(columnsUserCard);
        try {
            await getUserCards(client.sveklaServerV1, isValueSearch)
                .then(resp => {
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                    setDataTableFormat(resp);
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
        <button onClick={usersCard}>Search</button>
    </div>

    )
}
