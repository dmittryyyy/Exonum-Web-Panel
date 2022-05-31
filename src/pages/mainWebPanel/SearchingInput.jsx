import { React } from 'react';
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
            {navBarItem.id === 1 ?
                <GetTransaction testHash={testHash}/>

                : navBarItem.id === 2 ?
                    <GetOrder testHash={testHash}/>

                    : navBarItem.id === 3 ?
                        <ServiceApplication testHash={testHash}/>

                        : navBarItem.id === 4 ?
                            <GetUserWallet testHash={testHash}/>

                            : navBarItem.id === 5 ?
                                <GetDeviceKey navBarItem={navBarItem} testHash={testHash}/>

                                : navBarItem.id === 6 ?
                                    <GetOrders testHash={testHash}/>

                                    : ''
            }
        </div>
    )
}
