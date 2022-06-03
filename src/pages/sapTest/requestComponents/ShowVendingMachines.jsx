import { React, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getVendingMachines } from '../../../services/SapTestAPI';
import { columnsVendingMachines } from '../ColumnsTable';

export const ShowVendingMachines = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);
    const navigate = useNavigate();

    const showVendingMachines = async () => {
        setColumnsTable(columnsVendingMachines);
        try {
            await getVendingMachines(client.venidngMachine).then(resp => {
                setDataTableFormat(resp);
                setDataJsonFormat(JSON.stringify(resp, null, 2));
            });
            navigate('vending-machines')
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (window.location.href.indexOf('vending-machines') >= 0) {
            showVendingMachines();
      }
      }, []);

    return (

            <div>
                <button onClick={showVendingMachines}>Show VendingMachines</button>
            </div>

    )
}
