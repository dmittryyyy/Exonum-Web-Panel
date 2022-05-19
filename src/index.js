import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';
import { Client } from './services/cient';

import './index.scss';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider value={{ client: new Client() }}>
    <App />
  </ThemeContext.Provider>
);

