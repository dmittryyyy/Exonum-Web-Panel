import { React, useContext } from 'react';

import { ThemeContext } from '../../../index';
import { columnsCatalog } from '../ColumnsTable';
import { getCatalog } from '../../../services/NodeAPI';

export const ShowCatalog = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

  const { client } = useContext(ThemeContext);

  const showCatalog = async () => {
    setColumnsTable(columnsCatalog);
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          setDataJsonFormat(items.data);
          setDataTableFormat(items.data);
        })
    } catch (error) {
      console.log(error);
      setDataJsonFormat('Catalog undefined or server error');
    }
  }

  return (

    <div>
      <button onClick={showCatalog}>Show Catalog</button>
    </div> 

  )
}
