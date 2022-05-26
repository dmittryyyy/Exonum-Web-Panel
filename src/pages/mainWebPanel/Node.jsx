import { React, useContext } from 'react';

import { ThemeContext } from '../..';

export const Node = ({ isheight, isActive }) => {

    const { client } = useContext(ThemeContext);

    const readActiveNode = (e) => {
        client.setActiveNode(e.target.value)
    }

    return (
        <div className='node'>
            <div className="nodeWrapper">
            <div className="activeNode">
                <div className="nodeTitle">
                    <h3>Active Node</h3>
                    <div className={isActive ? 'activeNode' : 'notActiveNode'}></div>
                </div>
                <select onChange={readActiveNode}>
                    {client.nodesServers.map((node, index) =>
                        <option
                            key={index}>
                            {node}
                        </option>
                    )}
                </select>
            </div>
            <div className="height">
                <h3>Height</h3>
                <p>{isheight ? isheight : 'undifined'}</p>
            </div>
            </div>
        </div>
    )
}
