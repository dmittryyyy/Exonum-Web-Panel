import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import { Main } from '../../pages/mainWebPanel/Main';
import { SapTest } from '../../pages/sapTest/SapTest';
import { SapBasic } from '../../pages/sapBasic/SapBasic';
import { Layout } from '../layout/Layout';
import { MainSearchingInput } from '../../pages/mainWebPanel/MainSearchingInput';
import { SapTestSearchingInput } from '../../pages/sapTest/SapTestSearchingInput';

import './App.scss';

export const App = observer(() => {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path='web-panel/*' element={<Main />}>
            <Route path='search/*' element={<MainSearchingInput />} />
          </Route>

          <Route path='sapTest/*' element={<SapTest />}>
            <Route path='search/*' element={<SapTestSearchingInput />} />
          </Route>

          <Route path='sapBasic' element={<SapBasic />} />

        </Route>
      </Routes>

    </div>
  )
});
