import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';
import { Client } from '../src/services/Client';

import './index.css';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider value={{ client: new Client() }}>
    <App />
  </ThemeContext.Provider>
);

