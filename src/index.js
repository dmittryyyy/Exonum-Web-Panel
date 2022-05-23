import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';
import { ClientNode } from './services/client';

import './index.scss';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider value={{ client: new ClientNode() }}>
      <App />
  </ThemeContext.Provider>
);

