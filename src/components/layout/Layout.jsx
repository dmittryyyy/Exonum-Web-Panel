import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import { Header } from '../header/Header'
import { BlockchainInputs } from '../inputsSearchings/BlockchainInputs';
import { SapExplorerInputs } from '../inputsSearchings/SapExplorerInputs';
import { Blockchain } from '../../pages/blockchain/Blockchain';
import { SapExplorer } from '../../pages/sapExplorer/SapExplorer';
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
            <Route path='search/*' element={<BlockchainInputs />} />
          </Route>

          <Route path='sapTest/*' element={<SapExplorer isMenu={isMenu}/>}>
            <Route path='search/*' element={<SapExplorerInputs />} />
          </Route>

        </Routes>
      </main>

      {/* <Footer /> */}
    </>
  )
}
