import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchService } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ServiceApplication = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { service_applicationId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(service_applicationId ? service_applicationId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const columnsServiceApplication = [
        {
            name: 'window_hash',
            selector: (row) => row.window_hash,
            sortable: true,
            wrap: true,
        },
        {
            name: 'url',
            selector: (row) => row.url,
            sortable: true,
            wrap: true,
        },
        {
            name: 'successful_url',
            selector: (row) => row.successful_url,
            sortable: true,
            wrap: true,
        },
        {
            name: 'fail_url',
            selector: (row) => row.fail_url,
            sortable: true,
            wrap: true,
        },
        {
            name: 'name',
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'tags',
            selector: (row) => row.tags,
            sortable: true,
            wrap: true,
        },
    ]

    const getService = async () => {
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchService(client.activeNode, isValueSearch)
                        .then((service) => {
                            setDataJsonFormat(service.application_service_proof.to_application_service.entries[0].value);
                            setDataTableFormat('');
                        });
                    setIsError('');
                    setClassInput('search');
                    navigate(isValueSearch);
                } catch (error) {
                    console.log(error);
                    setDataJsonFormat('Key uncorrect or empty input field!');
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
            getService();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Service Application'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={getService}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} setDataTableFormat={setDataTableFormat} />
        </>

    )
}
