import { React } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import './NavBar.scss';

export const NavBar = ({ setNavBarItem, navBarItem }) => {

    const navBarItems = [
        { name: 'Search transaction', id: 1 },
        { name: 'Search order', id: 2 },
        { name: 'Service Application', id: 3 },
        { name: 'Search user wallet', id: 4 },
        { name: 'Search device key', id: 5 },
        { name: 'Search orders users', id: 6 },
    ];

    return (
        <ListGroup>
            {navBarItems.map((item, index) =>
                <ListGroupItem
                    onClick={() => setNavBarItem(item)}
                    active={item.id === navBarItem.id}
                    key={index}
                >
                    {item.name}
                </ListGroupItem>
            )}
        </ListGroup>
    )
}
