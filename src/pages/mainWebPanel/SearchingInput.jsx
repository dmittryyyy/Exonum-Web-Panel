import { React } from 'react';
import { GetTransaction } from './requestComponents/GetTransaction';
import { GetOrder } from './requestComponents/GetOrder';
import { ServiceApplication } from './requestComponents/ServiceApplication';
import { GetUserWallet } from './requestComponents/GetUserWallet';
import { GetDeviceKey } from './requestComponents/GetDeviceKey';
import { GetOrders } from './requestComponents/GetOrders';

export const SearchingInput = ({ navBarItem }) => {


    return (
        <div>
            {navBarItem.id === 1 ?
                <GetTransaction />

                : navBarItem.id === 2 ?
                    <GetOrder />

                    : navBarItem.id === 3 ?
                        <ServiceApplication />

                        : navBarItem.id === 4 ?
                            <GetUserWallet />

                            : navBarItem.id === 5 ?
                                <GetDeviceKey navBarItem={navBarItem}/>

                                : navBarItem.id === 6 ?
                                    <GetOrders />

                                    : ''
            }
        </div>
    )
}
