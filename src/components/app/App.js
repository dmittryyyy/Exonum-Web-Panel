import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import { Main } from '../../pages/mainWebPanel/Main';
import { SapTest } from '../../pages/sapTest/SapTest';
import { SapBasic } from '../../pages/sapBasic/SapBasic';
import { Layout } from '../layout/Layout';
import { SearchingInput } from '../../pages/mainWebPanel/SearchingInput';

import './App.scss';

export const App = observer (() => {

  return (
      <div className="App">

          <Routes>
            <Route path='web-panel/*' element={<Layout/>}>

            <Route path='' element={<Main />}>
              <Route path='search/*' element={<SearchingInput />}/>
            </Route>

            <Route path='sapTest' element={<SapTest />}/>

            <Route path='sapBasic' element={<SapBasic/>}/>
            
            </Route>
          </Routes>

      </div>
  )
});
