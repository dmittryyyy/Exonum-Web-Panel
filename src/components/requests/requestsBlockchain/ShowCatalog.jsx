import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getCatalog } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShowCatalog = () => {

  const { client, columnsBlockchain } = useContext(ThemeContext);

  const [isDataCatalog, setIsDataCatalog] = useState();

  const showCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
        .then(items => {
          setIsDataCatalog(items.data);
        });
    } catch (error) {
      console.log(error);
      setIsDataCatalog('Catalog undefined or server error');
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('catalog') >= 0) {
      showCatalog();
    }
  }, []);

  return (

    <>
      <RequestContent 
      data={isDataCatalog} 
      columnsTable={columnsBlockchain.catalog} />
    </>

  )
}
