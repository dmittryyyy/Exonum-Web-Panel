import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchService } from '../../../services/NodeAPI';

export const ServiceApplication = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');

    const GetService = async () => {
        try {
            await searchService(client.activeNode, isValueSearch)
                .then((service) => {
                    setDataJsonFormat(service.application_service_proof.to_application_service.entries[0].value);
                    setDataTableFormat('');
                });
        } catch (error) {
            console.log(error);
            setDataJsonFormat('Key uncorrect or empty input field!');
        }
    }
    return (

        <div className="searchWrapper">
            <div className='search'>
                {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                <input placeholder='Service Application'
                    value={isValueSearch}
                    onChange={(e) => setIsValueSearch(e.target.value)} />
            </div>
            <button onClick={GetService}>Search</button>
        </div>

    )
}
