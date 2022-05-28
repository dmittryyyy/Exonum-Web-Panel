import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchTransaction } from '../../../services/NodeAPI';
import { columnsTransaction } from '../../../components/columnsTable/mainPage/columnsTable';

export const GetTransaction = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    const getTransaction = async () => {
        try {
            if (testHash(isValueSearch)) {
                setColumnsTable(columnsTransaction);
                const resp = await searchTransaction(client.activeNode, isValueSearch);
                if (!resp) {
                    setDataJsonFormat('type: unknown')
                } else if (resp.type === 'committed') {
                    delete resp.location_proof
                    setDataJsonFormat(resp);
                    setDataTableFormat([resp]);
                } else if (resp.type === 'in-pool') {
                    delete resp.status
                    delete resp.content.debug
                    delete resp.location
                    delete resp.location_proof
                    setDataJsonFormat(resp);
                }
            } else {
                setDataJsonFormat('The entered string does not match hex');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Enter transaction number'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={getTransaction}>Search</button>
        </div>

    )
}
