import { React } from 'react';
import { GetTransaction } from './requestComponents/GetTransaction';
import { GetOrder } from './requestComponents/GetOrder';
import { ServiceApplication } from './requestComponents/ServiceApplication';
import { GetUserWallet } from './requestComponents/GetUserWallet';
import { GetDeviceKey } from './requestComponents/GetDeviceKey';
import { GetOrders } from './requestComponents/GetOrders';

export const SearchingInput = ({ navBarItem, setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {


    return (
        <div>
            {navBarItem.id === 1 ?
                <GetTransaction setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                : navBarItem.id === 2 ?
                    <GetOrder setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} />

                    : navBarItem.id === 3 ?
                        <ServiceApplication setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                        : navBarItem.id === 4 ?
                            <GetUserWallet setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                            : navBarItem.id === 5 ?
                                <GetDeviceKey setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} navBarItem={navBarItem} setColumnsTable={setColumnsTable} />

                                : navBarItem.id === 6 ?
                                    <GetOrders setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                                    : ''
            }
        </div>
    )
}
