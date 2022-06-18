import { React, useContext, useEffect } from 'react';

import { ThemeContext } from '../../../index';
import { columnsCatalog } from '../ColumnsTable';
import { getCatalog } from '../../../services/BlockhainAPI';
import { useNavigate } from 'react-router-dom';

export const ShowCatalog = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

  const { client } = useContext(ThemeContext);

  const navigate = useNavigate();

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
    if (window.location.href.indexOf('catalog') >= 0) {
      showCatalog();
  }
  }, []);

  return (

    <div>
      <button onClick={showCatalog}>Show Catalog</button>
    </div>

  )
}
