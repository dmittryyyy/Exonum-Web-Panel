import { React, useContext } from 'react';

import { ThemeContext } from '../../../index';
import { getVendingMachines } from '../../../services/SapTestAPI';
import { columnsVendingMachines } from '../ColumnsTable';

export const ShowVendingMachines = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const showVendingMachines = async () => {
        setColumnsTable(columnsVendingMachines);
        try {
            await getVendingMachines(client.venidngMachine).then(resp => {
                setDataTableFormat(resp);
                setDataJsonFormat(JSON.stringify(resp, null, 2));
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (

            <div>
                <button onClick={showVendingMachines}>Show VendingMachines</button>
            </div>

    )
}
