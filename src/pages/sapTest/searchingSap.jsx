import { React } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { ShowVendingMachines } from './requestComponents/ShowVendingMachines';

export const SearchingSap = ({ navBarItem, setNavBarItem, dataJsonFormat, setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const navBarItems = [
        { name: 'ShopItems', id: 1 },
        { name: 'Events', id: 2 },
        { name: 'ItemsLoaded', id: 3 },
        { name: 'BenefitRules', id: 4 },
        { name: 'UserBenefits', id: 5 },
        { name: 'UserSapInfo', id: 6 },
        { name: 'UserCard', id: 7 },
    ];

    const hideTable = () => {
        setDataJsonFormat();
        setDataTableFormat();
    }

    return (
        <>
            <ListGroup>
                <h3>Choose type search</h3>
                {navBarItems.map((item, index) =>
                    <ListGroupItem
                        onClick={() => setNavBarItem(item)}
                        active={item.id === navBarItem.id}
                        key={index}
                    >
                        {item.name}
                    </ListGroupItem>
                )}

                <div className="buttonListGroup">
                    <ShowVendingMachines setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />
                    {dataJsonFormat ? (
                        <button className='btnHideData' onClick={hideTable}>Hide data</button>
                    ) : (
                        ''
                    )}
                </div>
            </ListGroup>
        </>
    )
}
