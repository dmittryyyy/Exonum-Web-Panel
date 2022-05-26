import { React, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import { ShopItems } from './requestComponents/ShopItems';
import { Events } from './requestComponents/Events';


export const SearchingSap = ({setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const [navBarSapItems, setNavBarSapItems] = useState([]);

    const navBarItems = [
        { name: 'ShopItems', id: 1 },
        { name: 'Events', id: 2 },
    ];

    return (
        <>
            <ListGroup>
                {navBarItems.map((item, index) =>
                    <Button
                        onClick={() => setNavBarSapItems(item)}
                        active={item.id === navBarSapItems.id}
                        key={index}
                    >
                        {item.name}
                    </Button>
                )}
            </ListGroup>


                {navBarSapItems.name === 'Events' ?

                    <Events setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>

                    :
                    
                    <ShopItems setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>

                }
        </>
    )
}
