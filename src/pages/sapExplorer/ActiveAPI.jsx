import { React, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../..';

export const ActiveAPI = observer(() => {

    const { client } = useContext(ThemeContext);

    const [inputValue, setInputValue] = useState('');

    const readBaseAPI = (e) => {
        client.sapServers.map(item => {
            if (e.target.value === item.name) {
                client.setActiveAPI(item.url);
            }
        })
        setInputValue('');
        localStorage.setItem('url api', client.activeAPI);
    }

    const readCustomAPI = (e) => {
        setInputValue(e.target.value);
    }

    const onApplyURL = () => {
        client.setActiveAPI(inputValue);
        localStorage.setItem('url api', inputValue);
    }

    return (
        <>
            <div className='sapURL'>

                <div className="selectUrl">
                    <div className="selectTitle">
                        <h3>Base URL API</h3>
                    </div>
                    <select onChange={readBaseAPI}>
                        {client.sapServers.map((nameApi, index) =>
                            <option
                                key={index}>
                                {nameApi.name}
                            </option>
                        )}
                    </select>
                </div>

                <div className='wrapperCustomAPI'>
                    <button onClick={() => onApplyURL()}>Apply URL</button>
                    <div className='newAPI'>

                        {inputValue ? <span className='clearInput' onClick={() => setInputValue('')}>X</span> : ''}
                        <input type="text" placeholder='Enter custom URL API' onChange={readCustomAPI} value={inputValue} />

                    </div>
                </div>
            </div>

            <div className='activeURL'>
                <h3>Active URL API: <span>{client.activeAPI}</span></h3>
            </div>

        </>
    )
});
