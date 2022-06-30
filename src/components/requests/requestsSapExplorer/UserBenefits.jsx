import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUsersBenefits, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const UserBenefits = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_benefitsId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_benefitsId ? user_benefitsId : '');
    const [isDataBenefits, setIsDataBenefits] = useState();
    
    const [isDataBlockchain, setIsDataBlockchain] = useState();
    const [isErrorRelQuer, setIsisErrorRelQuer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onUsersBenefits = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            try {
                setIsLoading(true);
                await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setIsDataBenefits(resp);
                            setErrorInput('');
                            setIsisErrorRelQuer('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });
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
            setErrorInput('Empty search string!')
        }
    };

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsisErrorRelQuer('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsisErrorRelQuer('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data]);
                })
            } catch (e) {
                console.log(e);
                setIsisErrorRelQuer(e.message);
            }
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            onUsersBenefits();
        }
    }, []);

    return (
        <>
            <NavBarForRelatedQueries
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
                isErrorRelQuer={isErrorRelQuer}
            />

            <InputForRequest placeholder={'Enter user id'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onUsersBenefits} />

            <RequestContent
                data={isDataBenefits}
                columnsTable={columnsSapExplorer.benefits} 
                isLoading={isLoading} />

            
            <RequestContent data={isDataBlockchain} title={'Blockchain profile'}/>
        </>
    )
}
