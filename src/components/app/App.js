import { useContext, useState, useEffect } from 'react';

import { ThemeContext } from '../..';
import { Header } from '../header/Header';
import { Main } from '../../pages/mainWebPanel/Main';
import { expolorerBlocks } from '../../services/webPanelAPI';

import './App.scss';

export const App = () => {

  const { client } = useContext(ThemeContext);
  
  const [isheight, isSetheight] = useState('');
  const [isActive, isSetActive] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await expolorerBlocks(client.activeNode, '1').then((data) => { return data.range.start });
        if(!res) {
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

  return (
    <div className="App">

      <Header/>

      <main className='wrapper'>
        <Main 
         isheight={isheight}
         isActive={isActive}
        />
      </main>

    </div>
  )
}
