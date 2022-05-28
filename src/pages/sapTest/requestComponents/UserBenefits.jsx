import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getUsersBenefits } from '../../../services/SapTestAPI';
import { columnsUserBenefits } from '../../../components/columnsTable/sapPage/ColumnsTable';

export const UserBenefits = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const usersBenefits = async () => {
        setColumnsTable(columnsUserBenefits);
        try {
            await getUsersBenefits(client.sveklaServerV1, isValueSearch)
                .then(resp => {
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                    setDataTableFormat(resp);
                })
        } catch (err) {
            console.log(err)
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
                <button onClick={usersBenefits}>Search</button>
            </div>
    )
}
