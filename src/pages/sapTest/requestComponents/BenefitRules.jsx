import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getVendingProfilesBenefits } from '../../../services/SapTestAPI';
import { columnsBenefitsRules } from '../ColumnsTable';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const BenefitRules = () => {

    const { client } = useContext(ThemeContext);

    let { benefit_rulesId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(benefit_rulesId ? benefit_rulesId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const benefitRules = () => {
        setColumnsTable(columnsBenefitsRules);
        if (isValueSearch) {
            try {
                getVendingProfilesBenefits(client.sveklaServer, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
                        setDataTableFormat(resp);
                    });
                setIsError('');
                navigate(isValueSearch);
            } catch (err) {
                console.log(err);
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            benefitRules();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={benefitRules}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
        </>

    )
}
