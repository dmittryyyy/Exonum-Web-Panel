import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUserSapInfo } from '../../../services/SapTestAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const UserSapInfo = () => {

    const { client } = useContext(ThemeContext);

    let { user_infoId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_infoId ? user_infoId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const userSapInfo = async () => {
        if (isValueSearch) {
            try {
                await getUserSapInfo(client.sveklaServerV1, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(resp, null, 2);
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
            userSapInfo();
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
                <button onClick={userSapInfo}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} />
        </>
    )
}
