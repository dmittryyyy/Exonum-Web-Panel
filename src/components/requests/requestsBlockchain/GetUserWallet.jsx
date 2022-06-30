import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const GetUserWallet = ({ testHash }) => {

    const { client, columnsBlockchain } = useContext(ThemeContext);

    let { user_walletId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_walletId ? user_walletId : '');
    const [isDataWallet, setIsDataWallet] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

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

    useEffect(() => {
        if (isValueSearch) {
            onGetUserWallet();
        }
    }, []);

    return (

        <>
            <InputForRequest 
            classInput={classInput} placeholder={'Enter user wallet'}
            isError={isError} 
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetUserWallet}/>

            <RequestContent
                data={isDataWallet}
                columnsTable={columnsBlockchain.userWallet} />
        </>

    )
}
