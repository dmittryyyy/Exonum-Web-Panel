import { React } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ShowCatalog } from './requestComponents/showCatalog/ShowCatalog';
import { Link } from 'react-router-dom';

import { WebPanel_route } from '../../routes/constants';

export const SearchingBar = ({ navBarItem, setNavBarItem, setJsonCatalog, setTableCatalog, jsonCatalog }) => {

    const nodeBarItems = [
        { name: 'Search transaction', id: 1 },
        { name: 'Search order', id: 2 },
        { name: 'Service Application', id: 3 },
        { name: 'Search user wallet', id: 4 },
        { name: 'Search device key', id: 5 },
        { name: 'Search orders users', id: 6 },
    ];

    function BlogPost() {
        let { slug } = useParams();
        return <div>Now showing post {slug}</div>;
      }

    const hideTable = () => {
        setJsonCatalog();
        setTableCatalog();
    }

    return (
        <ListGroup>
            <h3>Choose type search</h3>
            {nodeBarItems.map((item, index) =>
                <ListGroupItem
                    onClick={() => setNavBarItem(item)}
                    active={item.id === navBarItem.id}
                    key={index}
                >
                    {item.name}
                </ListGroupItem>
            )}
            <div className="buttonListGroup">
                <ShowCatalog setDataJsonFormat={setJsonCatalog} setDataTableFormat={setTableCatalog} />
                {jsonCatalog ? (
                    <button className='btnHideData' onClick={hideTable}>Hide data</button>
                ) : (
                    ''
                )}
            </div>
        </ListGroup>
    )
}
