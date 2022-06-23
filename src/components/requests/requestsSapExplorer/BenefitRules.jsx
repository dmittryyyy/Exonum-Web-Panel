import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getVendingProfilesBenefits } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const BenefitRules = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { benefit_rulesId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(benefit_rulesId ? benefit_rulesId : '');
    const [isDataBenefits, setIsDataBenefits] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const benefitRules = () => {
        if (isValueSearch) {
            try {
                getVendingProfilesBenefits(client.activeAPI + '/api/', isValueSearch)
                    .then(resp => {
                        setIsDataBenefits(resp);
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

            <RequestContent 
            data={isDataBenefits} 
            columnsTable={columnsSapExplorer.benefitsRules} />
        </>

    )
}