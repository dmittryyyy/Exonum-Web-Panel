import { React, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';


export const SearchingSap = ({ setNavBarSapItems, navBarSapItems, countShopAndEventsItems, setCountShopAndEventsItems, valueCalendar, setValueCalendar }) => {

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


            <div className='choiceQuery'>
                {navBarSapItems.name === 'ShopItems' ?
                    <>
                        <div className='DataTime'>
                            <DateTimePicker onChange={setValueCalendar} value={valueCalendar}
                            />
                        </div>

                        <div className='limit'>
                            <input type="number" onChange={(e) => setCountShopAndEventsItems(e.target.value)} value={countShopAndEventsItems} />
                        </div>

                        <button>Найти</button>
                    </>
                    :
                    <div className='limit'>
                        <input type="number" onChange={(e) => setCountShopAndEventsItems(e.target.value)} value={countShopAndEventsItems} />
                        <button>Найти</button>
                    </div>

                }
            </div>
        </>
    )
}
