import { React } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ShowCatalog } from '../../pages/blockchain/requestComponents/ShowCatalog';
import { ShowVendingMachines } from '../../pages/sapTest/requestComponents/ShowVendingMachines';

import './NavBar.scss';

export const NavBar = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable, isMenu }) => {

    return (
        <div className="navBar">
            <ul className={isMenu ? 'list-group' : 'closeNavBar'}>
            <Link to=''><h3>Dashboard</h3></Link>
                {window.location.href.indexOf('blockchain') >= 0 ? (
                    <>
                        <NavLink className='list-group-item' to='search/transaction'>Transaction</NavLink>
                        <NavLink className='list-group-item' to='search/order'>Order</NavLink>
                        <NavLink className='list-group-item' to='search/service-application'>Service Application</NavLink>
                        <NavLink className='list-group-item' to='search/user-wallet'>User wallet</NavLink>
                        <NavLink className='list-group-item' to='search/device-key'>Device key</NavLink>
                        <NavLink className='list-group-item' to='search/orders'>Orders</NavLink>

                        <div className="buttonListGroup">
                            <ShowCatalog setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />
                        </div>
                    </>

                ) : (

                    <>
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

                    </>
                )}

            </ul>
        </div>
    )
}
