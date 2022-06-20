import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getVendingMachines } from '../../../services/SapTestAPI';
import { columnsVendingMachines } from '../ColumnsTable';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShowVendingMachines = () => {

    const { client } = useContext(ThemeContext);

    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const showVendingMachines = async () => {
        setColumnsTable(columnsVendingMachines);
        try {
            await getVendingMachines(client.venidngMachine).then(resp => {
                setDataTableFormat(resp);
                setDataJsonFormat(resp);
            });
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

        <>
      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
    </>

    )
}
