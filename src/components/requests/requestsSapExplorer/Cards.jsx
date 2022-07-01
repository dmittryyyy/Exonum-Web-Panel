import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getCards, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const Cards = observer(() => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { cards } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(cards ? cards : '');
    const [isDataCards, setIsDataCards] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();
    const [isErrorRelQuer, setIsisErrorRelQuer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onCards = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            try {
                setIsLoading(true);
                await getCards(client.activeAPI, isValueSearch)
                    .then(resp => {
                        
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setIsDataCards([resp]);
                            setErrorInput('');
                            setIsisErrorRelQuer('');
                            setIsErrorRequest(false);
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setErrorInput(`The data you entered is incorrect! ${e.message}`);
                setIsDataCards('');
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
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataCards[0].userId)
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
                    setIsDataBlockchain([data.data]);
                })
            } catch (e) {
                console.log(e);
                setIsisErrorRelQuer(e.message);
            }
        }
    }

    useEffect(() => {
        client.setActiveAPI(localStorage.getItem('url api'));
        if (isValueSearch) {
            onCards();
        }
    }, []);

    return (
        <>
            <NavBarForRelatedQueries 
            onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>} isErrorRelQuer={isErrorRelQuer}/>

            <InputForRequest placeholder={'Enter card id'}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onCards} onBlockchainProfile={onBlockchainProfile}/>

            <RequestContent
                data={isDataCards}
                columnsTable={columnsSapExplorer.columnsCards} isLoading={isLoading}/>

            <RequestContent data={isDataBlockchain} columnsTable={columnsSapExplorer.blockchainProfile} title={'Blockchain profile'}/>
        </>
    )
});
