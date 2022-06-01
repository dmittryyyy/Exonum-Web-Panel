import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GetTransaction } from './requestComponents/GetTransaction';
import { GetOrder } from './requestComponents/GetOrder';
import { ServiceApplication } from './requestComponents/ServiceApplication';
import { GetUserWallet } from './requestComponents/GetUserWallet';
import { GetDeviceKey } from './requestComponents/GetDeviceKey';
import { GetOrders } from './requestComponents/GetOrders';

export const SearchingInput = () => {

    const testHex = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    return (
        <div>
            
                <Routes>

                <Route path='transaction/*' element={<GetTransaction testHex={testHex} />}/>

                <Route path='order' element={<GetOrder testHex={testHex} />}/>

                <Route path='service-application' element={<ServiceApplication testHex={testHex} />}/>

                <Route path='user-wallet' element={<GetUserWallet testHex={testHex} />}/>

                <Route path='device-key' element={<GetDeviceKey testHex={testHex} />}/>

                <Route path='orders' element={<GetOrders testHex={testHex} />}/>
                
                </Routes>

        </div>
    )
}
