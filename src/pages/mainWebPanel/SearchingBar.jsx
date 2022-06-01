import { React } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { ShowCatalog } from './requestComponents/ShowCatalog';

export const SearchingBar = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable, dataJsonFormat }) => {


    return (
        <ListGroup>

            <h3>Choose type search</h3>
            
            <NavLink className='list-group-item' to='search/transaction'>Transaction</NavLink>
            <NavLink className='list-group-item' to='search/order'>Order</NavLink>
            <NavLink className='list-group-item' to='search/service-application'>Service Application</NavLink>
            <NavLink className='list-group-item' to='search/user-wallet'>User wallet</NavLink>
            <NavLink className='list-group-item' to='search/device-key'>Device key</NavLink>
            <NavLink className='list-group-item' to='search/orders'>Orders</NavLink>

            <div className="buttonListGroup">
                <ShowCatalog setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>
            </div>
        </ListGroup>
    )
}
