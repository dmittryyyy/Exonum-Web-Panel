import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getUserSapInfo } from '../../../services/SapTestAPI';
import { ContentSapTest } from '../ContentSapTest';

export const UserSapInfo = () => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');


    const userSapInfo = async () => {
        if(isValueSearch) {
            try {
                await getUserSapInfo(client.sveklaServerV1, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
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
                <button onClick={userSapInfo}>Search</button>
                <p>{isError}</p>
            </div>

            <ContentSapTest dataJsonFormat={dataJsonFormat} />
        </>
    )
}
