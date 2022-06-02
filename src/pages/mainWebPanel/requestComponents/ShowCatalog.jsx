import { React, useContext, useEffect } from 'react';

import { ThemeContext } from '../../../index';
import { columnsCatalog } from '../ColumnsTable';
import { getCatalog } from '../../../services/NodeAPI';
import { useNavigate } from 'react-router-dom';

export const ShowCatalog = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

  const { client } = useContext(ThemeContext);

  const navigate = useNavigate();

  const url = window.location.href;

  const showCatalog = async () => {
    setColumnsTable(columnsCatalog);
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          setDataJsonFormat(items.data);
          setDataTableFormat(items.data);
          navigate('catalog');
        });
    } catch (error) {
      console.log(error);
      setDataJsonFormat('Catalog undefined or server error');
    }

  }

  useEffect(() => {
    setColumnsTable(columnsCatalog);
    if (url === 'https://exonum.unotex.ru/web-panel/catalog') {
      showCatalog();
  }
  }, []);

  return (

    <div>
      <button onClick={showCatalog}>Show Catalog</button>
    </div>

  )
}
