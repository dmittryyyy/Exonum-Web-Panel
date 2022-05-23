import { React, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';


export const SearchingSap = ({ setNavBarSapItems, navBarSapItems }) => {


    const [countShopAndEventsItems, setCountShopAndEventsItems] = useState(10);

    const navBarItems = [
        { name: 'ShopItems', id: 1 },
        { name: 'Events', id: 2 },
    ];

    const [value, onChange] = useState();

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


            <div className='choiceQuery'>
                {navBarSapItems.name === 'ShopItems' ?
                    <>
                        <div className='DataTime'>
                            <DateTimePicker onChange={onChange} value={value} />
                        </div>

                        <div className='limit'>
                            <input type="number" onChange={(e) => setCountShopAndEventsItems(e.target.value)} value={countShopAndEventsItems} />
                        </div>

                        <button>Найти</button>
                    </>
                    :
                    <div className='limit'>
                        <input type="number" onChange={(e) => setCountShopAndEventsItems(e.target.value)} value={countShopAndEventsItems} />
                    </div>

                }
            </div>
        </>
    )
}
