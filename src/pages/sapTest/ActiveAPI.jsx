import { React, useContext, useState } from 'react';

import { ThemeContext } from '../..';

export const ActiveAPI = () => {

    const { client } = useContext(ThemeContext);

    const [inputValue, setInputValue] = useState('');

    const [showInput, setShowInput] = useState(false);

    const readBaseAPI = (e) => {
        client.setActiveAPI(e.target.value);
    }

    const readCustomAPI = (e) => {
        setInputValue(e.target.value);
        client.setActiveAPI(inputValue);
    }

    return (
        <div className='nodeWrapper'>
            <div className="activeNode">
                <div className="nodeTitle">
                    <h3>Choose base url API</h3>
                </div>
                <select onChange={readBaseAPI}>
                    {client.sapServers.map((node, index) =>
                        <option
                            key={index}>
                            {node}
                        </option>
                    )}
                </select>
            </div>
            <div className='wrapperCustomAPI'>
                <button onClick={() => setShowInput(true)}>Enter Custom url API</button>
                <div className={showInput ? 'newAPI' : 'hiddenNewAPI'}>
                {inputValue && <span className='clearInput' onClick={() => setInputValue('')}>X</span>}
                <input type="text" onChange={readCustomAPI} value={inputValue} />
                </div>
            </div>
        </div>
    )
}
