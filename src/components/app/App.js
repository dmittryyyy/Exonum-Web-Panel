// import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { observer } from 'mobx-react-lite';

import './App.scss';

export const App = observer(() => {

  return (
    <div className="App">

      <Routes>
        <Route path='/*' element={<Layout />}/>
      </Routes>

    </div>
  )
});
