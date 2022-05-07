import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Client } from '../src/services/Client';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

 export const ThemeContext = createContext(null);

root.render(
    <ThemeContext.Provider 
  value={{
    resp: new Client()
  }}>
    <App />
    </ThemeContext.Provider>
);

