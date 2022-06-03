// import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layout/Layout';

import './App.scss';

export const App = () => {

  return (
    <div className="App">

      <Routes>
        <Route path='web-panel/*' element={<Layout />}/>
      </Routes>

    </div>
  )
};
