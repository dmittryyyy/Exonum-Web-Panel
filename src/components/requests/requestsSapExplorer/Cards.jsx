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

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const onCards = async () => {
        if (isValueSearch) {
            try {
                await getCards(client.activeAPI, isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setIsDataCards([resp]);
                            setIsError('');
                            setClassInput('search');
                            navigate(isValueSearch);
                        }
                    });
            } catch (e) {
                console.log(e);
                setIsError(`The data you entered is incorrect! ${e.message}`);
                setIsDataCards('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataCards[0].userId)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsError('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsError('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data]);
                })
            } catch (e) {
                console.log(e);
                setIsError(e.message);
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
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
            />

            <InputForRequest classInput={classInput} placeholder={'Enter card id'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onCards} />

            <RequestContent
                data={isDataCards}
                columnsTable={columnsSapExplorer.columnsCards} />

            {isDataBlockchain ? <h4>Blockchain profile</h4> : ''}
            <RequestContent data={isDataBlockchain} />
        </>
    )
});
