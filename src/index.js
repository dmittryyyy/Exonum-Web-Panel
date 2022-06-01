import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './components/app/App';
import { ClientNode } from './services/client';

import './index.scss';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider value={{ client: new ClientNode() }}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ThemeContext.Provider>
);

