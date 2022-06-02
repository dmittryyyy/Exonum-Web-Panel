import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUsersBenefits } from '../../../services/SapTestAPI';
import { columnsUserBenefits } from '../ColumnsTable';
import { ContentSapTest } from '../ContentSapTest';

export const UserBenefits = () => {

    const { client } = useContext(ThemeContext);

    let { user_benefitsId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_benefitsId ? user_benefitsId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const usersBenefits = async () => {
        setColumnsTable(columnsUserBenefits);
        if (isValueSearch) {
            try {
                await getUsersBenefits(client.sveklaServerV1, isValueSearch)
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

            <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
        </>
    )
}
