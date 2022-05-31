import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GetTransaction } from './requestComponents/GetTransaction';
import { GetOrder } from './requestComponents/GetOrder';
import { ServiceApplication } from './requestComponents/ServiceApplication';
import { GetUserWallet } from './requestComponents/GetUserWallet';
import { GetDeviceKey } from './requestComponents/GetDeviceKey';
import { GetOrders } from './requestComponents/GetOrders';

export const SearchingInput = ({ navBarItem }) => {

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    return (
        <div>

                <Routes>
                <Route path='Search%20transaction' element={<GetTransaction testHash={testHash} />}/>

                <Route path='Search%20order' element={<GetOrder testHash={testHash} />}/>

                <Route path='Service%20Application' element={<ServiceApplication testHash={testHash} />}/>

                <Route path='Search%20transaction' element={<GetUserWallet testHash={testHash} />}/>

                <Route path='Search%20transaction' element={<GetDeviceKey testHash={testHash} />}/>

                <Route path='Search%20transaction' element={<GetOrders testHash={testHash} />}/>
                </Routes>


        </div>
    )
}
