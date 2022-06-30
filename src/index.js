import { createContext, React } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './components/app/App';
import { ClientNode } from './services/client';
import { ColumnsBlockchain } from './components/columnsTable/ColumnsBlockchain';
import { ColumnsSapExplorer } from './components/columnsTable/ColumnsSapExplorer';

import './index.scss';

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider 
  value={{ 
    client: new ClientNode(),
    columnsBlockchain: new ColumnsBlockchain(),
    columnsSapExplorer: new ColumnsSapExplorer(),
    }}>
    <HashRouter>
    <App />
    </HashRouter>
  </ThemeContext.Provider>
);

