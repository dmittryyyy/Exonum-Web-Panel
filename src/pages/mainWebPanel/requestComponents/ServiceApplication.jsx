import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchService } from '../../../services/NodeAPI';
import { ContentMain } from '../ContentMain';

export const ServiceApplication = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [isError, setIsError] = useState('');
    const [classInput, setClassInput] = useState('search');

    const GetService = async () => {
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

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Service Application'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={GetService}>Search</button>
                <p>{isError}</p>
            </div>

            <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} setDataTableFormat={setDataTableFormat}/>
        </>

    )
}
