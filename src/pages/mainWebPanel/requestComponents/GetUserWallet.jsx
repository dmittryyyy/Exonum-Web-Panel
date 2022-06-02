import { React, useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/NodeAPI';
import { columnsUserWallet } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetUserWallet = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { user_walletId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_walletId ? user_walletId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const getUserWallet = async () => {
        setColumnsTable(columnsUserWallet);
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                            setDataJsonFormat(wallet.data);
                            setDataTableFormat([wallet.data]);
                        });
                        setIsError('');
                        setClassInput('search');
                        navigate(isValueSearch);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setIsError('Not a HEX string');
                setClassInput('searchError');
            }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            getUserWallet();
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
                    <input placeholder='Enter user wallet'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={getUserWallet}>Search</button>
                <p>{isError}</p>
            </div>

            <Routes>
                <Route path={isValueSearch} element={<ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>}/>
            </Routes>
        </>

    )
}
