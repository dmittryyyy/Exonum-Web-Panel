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

    const [isLoading, setIsLoading] = useState(false);

    const onGetUserWallet = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                setIsLoading(true);
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                            if (!wallet || wallet === []) {
                                setErrorInput('Data undefined!');
                            }
                            setIsDataWallet([wallet.data]);
                            setErrorInput('');
                            setIsErrorRequest(false);
                        });
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setErrorInput(`The data you entered is incorrect! ${e.message}`);
                    if (e.response.status >= 500) {
                        setErrorInput('Unexpected error, please try again later...');
                    }
                    setIsErrorRequest(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrorInput('Not a HEX string');
            }
        } else {
            setErrorInput('Empty search string!');
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
            placeholder={'Enter user wallet'}
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetUserWallet}/>

            <RequestContent
                data={isDataWallet}
                columnsTable={columnsBlockchain.userWallet} 
                isLoading={isLoading} />
        </>

    )
}
