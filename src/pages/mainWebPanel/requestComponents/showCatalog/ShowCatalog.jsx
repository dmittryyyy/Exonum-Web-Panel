import { React, useContext } from 'react';

import { ThemeContext } from '../../../../index';
import { getCatalog } from '../../../../services/NodeAPI';

export const ShowCatalog = ({ setDataJsonFormat, setDataTableFormat }) => {

  const { client } = useContext(ThemeContext);

  const showCatalog = async () => {
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
