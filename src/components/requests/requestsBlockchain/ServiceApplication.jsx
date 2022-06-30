import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchServApplic } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const ServiceApplication = ({ testHash }) => {

    const { client, columnsBlockchain } = useContext(ThemeContext);

    let { service_applicationId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(service_applicationId ? service_applicationId : '');
    const [isDataSAP, setIsDataSAP] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const onGetService = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchServApplic(client.activeNode, isValueSearch)
                        .then((service) => {
                            if (!service || service === []) {
                                setIsError('Data undefined!');
                            }
                            setIsDataSAP([service.application_service_proof.to_application_service.entries[0].value]);
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (e) {
                    console.log(e);
                    setIsError(`The data you entered is incorrect! ${e.message}`);
                    setIsDataSAP('');
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
            onGetService();
        }
    }, []);

    return (

        <>
            <InputForRequest 
            classInput={classInput} placeholder={'Service Application'}
            isError={isError} 
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetService}/>

            <RequestContent
                data={isDataSAP}
            />
        </>

    )
}
