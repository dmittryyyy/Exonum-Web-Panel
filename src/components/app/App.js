import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Header } from '../header/Header';
import { AppRouter } from '../appRouter/AppRouter';


import './App.scss';

export const App = observer (() => {

  return (
    <BrowserRouter>
      <div className="App">

        <Header />

        <main>
          <AppRouter/>
        </main>

      </div>
    </BrowserRouter>
  )
});
