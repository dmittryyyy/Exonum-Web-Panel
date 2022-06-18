import { React, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../..';

export const ActiveAPI = observer(() => {

    const { client } = useContext(ThemeContext);

    const [inputValue, setInputValue] = useState('');

    const [showInput, setShowInput] = useState(false);

    const readBaseAPI = (e) => {
        client.setActiveAPI(e.target.value);
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
                    <button onClick={() => setShowInput(true)}>Enter Custom URL API</button>
                    <button onClick={() => onApplyURL()}>Apply URL</button>
                    <div className={showInput ? 'newAPI' : 'hiddenNewAPI'}>

                        {inputValue ? <span className='clearInput' onClick={() => setInputValue('')}>X</span> : ''}
                        <input type="text" onChange={readCustomAPI} value={inputValue} />

                    </div>

                </div>
            </div>
            <div className='activeURL'>
                <h3>Active url API: <span>{client.activeAPI}</span></h3>
            </div>
        </>
    )
});
