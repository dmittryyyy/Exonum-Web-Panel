import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WebPanel_route } from '../../../../routes/constants';

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
      <Link to={WebPanel_route + '/ShowCatalog'}><button onClick={showCatalog}>Show Catalog</button></Link>
    </div> 

  )
}
