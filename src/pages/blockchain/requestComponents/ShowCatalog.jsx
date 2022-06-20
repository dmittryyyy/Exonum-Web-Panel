import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../../index';
import { columnsCatalog } from '../ColumnsTable';
import { getCatalog } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShowCatalog = () => {

  const { client } = useContext(ThemeContext);

  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();
  const [columnsTable, setColumnsTable] = useState();

  const showCatalog = async () => {
    setColumnsTable(columnsCatalog);
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          setDataJsonFormat(items.data);
          setDataTableFormat(items.data);
        });
    } catch (error) {
      console.log(error);
      setDataJsonFormat('Catalog undefined or server error');
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('catalog') >= 0) {
      showCatalog();
  }
  }, []);

  return (

    <>
      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />
    </>

  )
}
