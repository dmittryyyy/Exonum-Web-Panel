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

    const [isLoading, setIsLoading] = useState(false);

    const onGetService = async (setErrorInput, setIsErrorRequest) => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    setIsLoading(true);
                    await searchServApplic(client.activeNode, isValueSearch)
                        .then((service) => {
                            if (!service || service === []) {
                                setErrorInput('Data undefined!');
                            }
                            setIsDataSAP([service.application_service_proof.to_application_service.entries[0].value]);
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
            onGetService();
        }
    }, []);

    return (

        <>
            <InputForRequest 
            placeholder={'Service Application'}
            isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch} 
            request={onGetService}/>

            <RequestContent
                data={isDataSAP}
                isLoading={isLoading}
            />
        </>

    )
}
