import { useContext, useState, useEffect } from 'react';

import { ThemeContext } from '../..';
import { Header } from '../header/Header';
import { Search } from '../Search/Search';
import { expolorerBlocks } from '../../services/webPanelAPI';

import './App.scss';

export const App = () => {

  const { client } = useContext(ThemeContext);

  const [isheight, isSetheight] = useState('');
  const [isActive, isSetActive] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        if (client.activeNode === '') {
          isSetActive(false);
          isSetheight('');
          clearInterval(intervalId);
        }
        const res = await expolorerBlocks(client.activeNode, '1').then((data) => { return data.range.start });
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
    }, 3000);
  }, []);


  return (
    <div className="App">
      <Header
        isheight={isheight}
        isActive={isActive}
      />
      <Search />
    </div>
  )
}
