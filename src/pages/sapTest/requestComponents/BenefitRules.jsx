import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getVendingProfilesBenefits } from '../../../services/SapTestAPI';
import { columnsBenefitsRules } from '../ColumnsTable';
import { ContentSapTest } from '../ContentSapTest';

export const BenefitRules = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const benefitRules = () => {
        setColumnsTable(columnsBenefitsRules);
        try {
            getVendingProfilesBenefits(client.sveklaServer, isValueSearch)
                .then(resp => {
                    setDataJsonFormat(JSON.stringify(resp, null, 2));
                    setDataTableFormat(resp);
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

            <>
            <div className="searchWrapper">
                <div className='search'>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={benefitRules}>Search</button>
            </div>

            <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
            </>


    )
}
