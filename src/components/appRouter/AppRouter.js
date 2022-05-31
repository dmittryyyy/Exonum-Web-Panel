import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { publicRoutes } from '../../routes/routes';
import { Main } from '../../pages/mainWebPanel/Main';

export const AppRouter = observer (() => {
    
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            <Route path='web-panel/*' element={<Main />} />
            
        </Routes>
    )
});
