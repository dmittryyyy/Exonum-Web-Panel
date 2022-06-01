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

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const benefitRules = () => {
        setColumnsTable(columnsBenefitsRules);
        if(isValueSearch) {
            try {
                getVendingProfilesBenefits(client.sveklaServer, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
                        setDataTableFormat(resp);
                    });
                    setIsError('');
            } catch (err) {
                console.log(err);
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    }

    return (

            <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={benefitRules}>Search</button>
                <p>{isError}</p>
            </div>

            <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
            </>
            
    )
}
