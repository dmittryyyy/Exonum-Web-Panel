import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUsersBenefits } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const UserBenefits = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_benefitsId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_benefitsId ? user_benefitsId : '');
    const [isDataBenefits, setIsDataBenefits] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const usersBenefits = async () => {
        if (isValueSearch) {
            try {
                await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
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
            usersBenefits();
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
                <button onClick={usersBenefits}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent 
            data={isDataBenefits} 
            columnsTable={columnsSapExplorer.benefits} />
        </>
    )
}
