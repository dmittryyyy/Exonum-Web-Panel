import { React } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { ShowVendingMachines } from './requestComponents/ShowVendingMachines';

export const SearchingSap = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    return (
        <>
            <ListGroup>
                <h3>Choose type search</h3>

                <NavLink className='list-group-item' to='search/shop-items'>ShopItems</NavLink>
                <NavLink className='list-group-item' to='search/events'>Events</NavLink>
                <NavLink className='list-group-item' to='search/items-loaded'>ItemsLoaded</NavLink>
                <NavLink className='list-group-item' to='search/benefit-rules'>BenefitRules</NavLink>
                <NavLink className='list-group-item' to='search/user-benefits'>UserBenefits</NavLink>
                <NavLink className='list-group-item' to='search/user-sapInfo'>UserSapInfo</NavLink>
                <NavLink className='list-group-item' to='search/user-card'>UserCard</NavLink>

                <div className="buttonListGroup">
                    <ShowVendingMachines setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />
                </div>
            </ListGroup>
        </>
    )
}
