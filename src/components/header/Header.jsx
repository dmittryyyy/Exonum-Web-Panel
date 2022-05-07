import { React, useContext, useState } from 'react';
import { ThemeContext } from '../..';

import './Header.scss';

export const Header = ({ isActualNode, isheight }) => {

    const { client } = useContext(ThemeContext);
    const [isNode, setIsNode] = useState('');

    return (
        <header>
            <div className="activeNode">
                <h3>Active Node</h3>
                <select onChange={(e) => setIsNode(e.target.value)}>
                    <option value="">{isNode || 'select is node'}</option>
                    {client.nodesServers.map(node =>
                        <option>
                            value={node}
                        </option>
                        )}
                </select>
            </div>
            <div className="height">
                <h3>Height</h3>
                <p>{isheight}</p>
            </div>
        </header>
    )
}
