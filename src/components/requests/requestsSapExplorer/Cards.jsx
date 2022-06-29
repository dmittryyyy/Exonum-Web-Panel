import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../../index';
import { getCards, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const Cards = observer(() => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { cards } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(cards ? cards : '');
    const [isDataCards, setIsDataCards] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const Cards = async () => {
        if (isValueSearch) {
            try {
                await getCards(client.activeAPI, isValueSearch)
                    .then(resp => {
                        setIsDataCards([resp]);
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

    const onBlockchainProfile = async () => {
        let idBlockchian;
        await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataCards[0].userId)
            .then(resp => {
                idBlockchian = resp.blockchainId;
            });
        await getBlockchainProfile(idBlockchian).then(data => {
            setIsDataBlockchain([data]);
        })
    }

    useEffect(() => {
        client.setActiveAPI(localStorage.getItem('url api'));
        if (isValueSearch) {
            Cards();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
<NavBarForRelatedQueries
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
            />

            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter card id'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={Cards}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent 
            data={isDataCards} 
            columnsTable={columnsSapExplorer.columnsCards} />

{isDataBlockchain ? <h4>Blockchain profile</h4> : ''}
            <RequestContent data={isDataBlockchain} />
        </>

    )
});
