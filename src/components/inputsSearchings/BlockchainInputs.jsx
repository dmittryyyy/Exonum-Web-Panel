import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GetTransaction } from '../requests/requestsBlockchain/GetTransaction';
import { GetOrder } from '../requests/requestsBlockchain/GetOrder';
import { ServiceApplication } from '../requests/requestsBlockchain/ServiceApplication';
import { GetUserWallet } from '../requests/requestsBlockchain/GetUserWallet';
import { GetDeviceKey } from '../requests/requestsBlockchain/GetDeviceKey';
import { GetOrders } from '../requests/requestsBlockchain/GetOrders';
import { ShowCatalog } from '../requests/requestsBlockchain/ShowCatalog';

export const BlockchainInputs = () => {

    const testHash = (str) => {
        return /^[A-F0-9]+$/i.test(str);
    };

    return (
        <div>

            <Routes>

                <Route path='transaction/*' element={<GetTransaction testHash={testHash} />} >
                    <Route path=":transactionId" element={<GetTransaction />} />
                </Route>

                <Route path='order/*' element={<GetOrder testHash={testHash} />}>
                    <Route path=':orderId' element={<GetOrder />} />
                </Route>

                <Route path='service-application/*' element={<ServiceApplication testHash={testHash} />}>
                    <Route path=':service_applicationId' element={<ServiceApplication />} />
                </Route>

                <Route path='user-wallet/*' element={<GetUserWallet testHash={testHash} />} >
                    <Route path=':user_walletId' element={<GetUserWallet />} />
                </Route>

                <Route path='device-key/*' element={<GetDeviceKey testHash={testHash} />} >
                    <Route path=':device_Key' element={<GetDeviceKey />} />
                </Route>

                <Route path='orders/*' element={<GetOrders testHash={testHash} />} >
                    <Route path=':orders' element={<GetOrders />} />
                </Route>

                <Route path='catalog/*' element={<ShowCatalog />}/>

            </Routes>

        </div>
    )
}
