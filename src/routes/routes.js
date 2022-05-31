import { Main } from '../pages/mainWebPanel/Main';
import { SapTest } from '../pages/sapTest/SapTest';

import { WebPanel_route } from './constants';
import { SapTest_route } from './constants';

export const publicRoutes = [
    {
        path: WebPanel_route,
        Component: <Main/>
    },
    {
        path: SapTest_route,
        Component: <SapTest/>
    },
]
