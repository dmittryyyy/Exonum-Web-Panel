import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getBenefitRules, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const BenefitRules = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { benefit_rulesId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(benefit_rulesId ? benefit_rulesId : '');
    const [isDataBenefits, setIsDataBenefits] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const onBenefitRules = async () => {
        if (isValueSearch) {
            try {
                await getBenefitRules(client.activeAPI + '/api/', isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setIsDataBenefits(resp);
                            setIsError('');
                            setClassInput('search');
                            navigate(isValueSearch);
                        }
                    });
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
            onBenefitRules();
        }
    }, []);

    return (

        <>
            <NavBarForRelatedQueries
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>}
            />

            <InputForRequest classInput={classInput} placeholder={'Enter user id'}
                isError={isError}
                isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                request={onBenefitRules} />

            <RequestContent
                data={isDataBenefits}
                columnsTable={columnsSapExplorer.benefitsRules} />

            
            <RequestContent data={isDataBlockchain} title={'Blockchain profile'}/>
        </>

    )
}
