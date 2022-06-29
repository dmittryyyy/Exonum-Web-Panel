import { React, useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../../../index';
import { getCatalog } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShowCatalog = () => {

  const { client, columnsBlockchain } = useContext(ThemeContext);

  const [isDataCatalog, setIsDataCatalog] = useState();
  const [isError, setIsError] = useState('');

  const onShowCatalog = async () => {
    try {
      await getCatalog(client.activeNode)
        .then(data => {
          if (!data || data === []) {
            setIsError('Data undefined!')
          }
          setIsDataCatalog(data.data);
          setIsError('');
        });
    } catch (e) {
      console.log(e);
      setIsError(e.message);
      setIsDataCatalog('');
      if (e.response.status >= 500) {
        setIsError('Unexpected error, please try again later...');
      }
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('catalog') >= 0) {
      onShowCatalog();
    }
  }, []);

  return (

    <>
      <div className="searchWrapper">
        <p>{isError}</p>
      </div>

      <RequestContent
        data={isDataCatalog}
        columnsTable={columnsBlockchain.catalog} />
    </>

  )
}
