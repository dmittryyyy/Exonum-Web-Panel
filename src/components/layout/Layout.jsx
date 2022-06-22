import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import { Header } from '../header/Header'
import { MainSearchingInput } from '../../pages/blockchain/MainSearchingInput';
import { SapTestSearchingInput } from '../../pages/sapTest/SapTestSearchingInput';
import { Blockchain } from '../../pages/blockchain/Blockchain';
import { SapTest } from '../../pages/sapTest/SapTest';
import { Home } from '../../pages/home/Home';

export const Layout = () => {

  const [isMenu, setIsMenu] = useState(true);

  return (
    <>
      <Header setIsMenu={setIsMenu} isMenu={isMenu} />

      <main>
        <Routes>
          <Route index element={<Home />} />

          <Route path='blockchain/*' element={<Blockchain isMenu={isMenu}/>}>
            <Route path='search/*' element={<MainSearchingInput />} />
          </Route>

          <Route path='sapTest/*' element={<SapTest isMenu={isMenu}/>}>
            <Route path='search/*' element={<SapTestSearchingInput />} />
          </Route>

        </Routes>
      </main>

      {/* <Footer /> */}
    </>
  )
}
