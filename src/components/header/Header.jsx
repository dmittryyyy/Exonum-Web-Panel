import { React, useContext } from 'react';
import { ThemeContext } from '../..';

import './Header.scss';

export const Header = ({ isheight, isActive, GetResult }) => {

    const { client } = useContext(ThemeContext);

    const readActiveNode = (e) => {
        client.setActiveNode(e.target.value)
        console.log(client.activeNode)
    }

    const getActiveNode = () => {
        GetResult();
        // setInterval(GetResult(), 1500);
    }

    return (
        <header>
            <div className="activeNode">
                <div className="nodeTitle">
                <h3>Active Node</h3>
                <div className={isActive ? 'activeNode' : 'notActiveNode'}></div>
                </div>
                <select onChange={readActiveNode} onClick={getActiveNode}>
                    <option value="Select is node">{'Select is node'}</option>
                    {client.nodesServers.map(node =>
                        <option>
                            {node}
                        </option>
                        )}
                </select>
            </div>
            <div className="height">
                <h3>Height</h3>
                <p>{isheight ? isheight : 'undifined'}</p>
            </div>
        </header>
    )
}
