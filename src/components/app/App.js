import { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeContext } from '../..';
import { Header } from '../header/Header';
import { Main } from '../../pages/mainWebPanel/Main';
import { SapBasic } from '../../pages/sapBasic/SapBasic';
import { SapTest } from '../../pages/sapTest/SapTest';
import { expolorerBlocks } from '../../services/NodeAPI';

import './App.scss';


export const App = () => {

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

  return (
    <BrowserRouter>
      <div className="App">

        <Header />

        <main>
          <Routes>
            <Route path='/web-panel' element={
            <Main
              isheight={isheight}
              isActive={isActive}
            />} />

            <Route path='/testsap' element={
              <SapTest/>
            }/>

            <Route path='/basicsap' element={
              <SapBasic/>
            }/>

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}
