import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUsersBenefits, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const UserBenefits = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { user_benefitsId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_benefitsId ? user_benefitsId : '');
    const [isDataBenefits, setIsDataBenefits] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    };

    const onUsersBenefits = async () => {
        if (isValueSearch) {
            try {
                await getUsersBenefits(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
                    .then(resp => {
                        if(!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setIsDataBenefits(resp);
                            setIsError('');
                            setClassInput('search');
                        }
                    });
                navigate(isValueSearch);
            } catch (e) {
                console.log(e);
                setIsError(`The data you entered is incorrect! ${e.message}`);
                setIsDataBenefits('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onUsersBenefits();
        }
    }

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isValueSearch)
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
        if (isValueSearch) {
            onUsersBenefits();
        }
    }, []);

    return (

        <>
            <NavBarForRelatedQueries
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
            />

            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        onKeyDown={onKeyDown}
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={onUsersBenefits}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent
                data={isDataBenefits}
                columnsTable={columnsSapExplorer.benefits} />

            {isDataBlockchain ? <h4>Blockchain profile</h4> : ''}
            <RequestContent data={isDataBlockchain} />
        </>
    )
}
