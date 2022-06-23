import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getCatalog } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShowCatalog = () => {

  const { client } = useContext(ThemeContext);

  const [dataJsonFormat, setDataJsonFormat] = useState();
  const [dataTableFormat, setDataTableFormat] = useState();

  const columnsCatalog = [
    {
      name: 'id',
      selector: (row) => row.application_service_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Case',
      selector: (row) => row.case,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Tags',
      selector: row => row.tags,
      sortable: true,
      wrap: true,
      maxWidth: '50px',
    },
    {
      name: 'URL',
      selector: (row) => row.url,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Hash',
      selector: (row) => row.window_hash,
      sortable: true,
      wrap: true,
    },
  ]

  const showCatalog = async () => {
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
      <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsCatalog} setDataTableFormat={setDataTableFormat} />
    </>

  )
}
