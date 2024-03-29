import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../..';
import { expolorerBlocks } from '../../services/BlockhainAPI';

export const Node = () => {

  const { client } = useContext(ThemeContext);

  const [isheight, isSetheight] = useState('');
  const [isActive, isSetActive] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await expolorerBlocks(client.activeNode, '1').then((data) => { return data.range.start });
        if (!res) {
          isSetActive(false);
          isSetheight('');
          clearInterval(intervalId);
        }
        isSetheight(res);
        isSetActive(true);
      } catch (e) {
        console.log(e);
        isSetActive(false);
        isSetheight('');
        clearInterval(intervalId);
      }
    }

    const intervalId = setInterval(function () {
      fetchData();
    }, 2000);
  }, []);

  const readActiveNode = (e) => {
    client.nodesServers.map(item => {
      if (e.target.value === item.name) {
        client.setActiveNode(item.url);
      }
    })
  }

  return (
    <>
      <div className='nodeWrapper'>
        <div className="activeNode">
          <div className="nodeTitle">
            <h3>Active Node</h3>
            <div className={isActive ? 'activeNode' : 'notActiveNode'} title="Indicator activity"></div>
          </div>
          <select onChange={readActiveNode}>
            {client.nodesServers.map((node, index) =>
              <option
                key={index}>
                {node.name}
              </option>
            )}
          </select>
        </div>
        <div className="height">
          <h3>Height</h3>
          {isheight ? 
        <p>{isheight}</p>  
        :
        <p><img src="images/loadingHeight.gif" alt="Loading height" /></p>
        }
        </div>
      </div>
      <div className='activeURL'>
        <h3>Active Node: <span>{client.activeNode}</span></h3>
      </div>
    </>
  )
}
