import { React } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WebPanel_route } from '../../routes/constants';
import { ShowCatalog } from './requestComponents/showCatalog/ShowCatalog';

export const SearchingBar = ({ navBarItem, setNavBarItem, setJsonCatalog, setTableCatalog, jsonCatalog }) => {

    const nodeBarItems = [
        { name: 'Search transaction', id: 1 },
        { name: 'Search order', id: 2 },
        { name: 'Service Application', id: 3 },
        { name: 'Search user wallet', id: 4 },
        { name: 'Search device key', id: 5 },
        { name: 'Search orders users', id: 6 },
    ];

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
                        active={item.name === navBarItem.name}
                        key={index}
                    >
                        {item.name}
                    </ListGroupItem>
            )}
            <div className="buttonListGroup">
                <ShowCatalog setDataJsonFormat={setJsonCatalog} setDataTableFormat={setTableCatalog} />
                {jsonCatalog ? (
                    <button className='btnHideData' onClick={hideTable}>Hide catalog</button>
                ) : (
                    ''
                )}
            </div>
        </ListGroup>
    )
}
