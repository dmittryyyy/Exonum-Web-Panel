import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const GetUserWallet = ({ testHash }) => {

    const { client, columnsBlockchain } = useContext(ThemeContext);

    let { user_walletId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_walletId ? user_walletId : '');
    const [isDataWallet, setIsDataWallet] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const getUserWallet = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                          setIsDataWallet([wallet.data]);
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

            <RequestContent 
            data={isDataWallet} 
            columnsTable={columnsBlockchain.userWallet} />
        </>

    )
}
