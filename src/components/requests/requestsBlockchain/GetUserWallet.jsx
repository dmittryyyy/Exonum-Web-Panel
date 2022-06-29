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

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onGetUserWallet = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                            if (!wallet || wallet === []) {
                                setIsError('Data undefined!');
                            }
                            setIsDataWallet([wallet.data]);
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setIsError(`The data you entered is incorrect! ${e.message}`);
                    setIsDataWallet('');
                    if (e.response.status >= 500) {
                        setIsError('Unexpected error, please try again later...');
                    }
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

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onGetUserWallet();
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onGetUserWallet();
        }
    }, []);

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user wallet'
                        onKeyDown={onKeyDown}
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={onGetUserWallet}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent
                data={isDataWallet}
                columnsTable={columnsBlockchain.userWallet} />
        </>

    )
}
