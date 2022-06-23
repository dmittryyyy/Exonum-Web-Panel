import { React } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';

export const NavBar = ({ isMenu }) => {

    return (
        <div className="navBar">
            <ul className={isMenu ? 'list-group' : 'closeNavBar'}>
            <div className='dashBoard'>
            <Link to=''><h3>Dashboard</h3></Link>
            <Link to=''><img src="images/resetDashboard.png" alt="Cброс" title='Reset choose'/></Link>
            </div>
                {window.location.href.indexOf('blockchain') >= 0 ? (
                    <>
                        <NavLink className='list-group-item' to='search/transaction'>Transaction</NavLink>
                        <NavLink className='list-group-item' to='search/order'>Order</NavLink>
                        <NavLink className='list-group-item' to='search/service-application'>Service Application</NavLink>
                        <NavLink className='list-group-item' to='search/user-wallet'>User wallet</NavLink>
                        <NavLink className='list-group-item' to='search/device-key'>Device key</NavLink>
                        <NavLink className='list-group-item' to='search/orders'>Orders</NavLink>
                        <NavLink className="list-group-item" to='search/catalog'>Show Catalog</NavLink>
                    </>

                ) : (

                    <>
                        <NavLink className='list-group-item' to='search/shop-items'>ShopItems</NavLink>
                        <NavLink className='list-group-item' to='search/events'>Events</NavLink>
                        <NavLink className='list-group-item' to='search/items-loaded'>ItemsLoaded</NavLink>
                        <NavLink className='list-group-item' to='search/benefit-rules'>BenefitRules</NavLink>
                        <NavLink className='list-group-item' to='search/user-benefits'>Benefits</NavLink>
                        <NavLink className='list-group-item' to='search/user-sapInfo'>User SapInfo</NavLink>
                        <NavLink className='list-group-item' to='search/user-card'>User Cards</NavLink>
                        <NavLink className='list-group-item' to='search/cards'>Cards</NavLink>
                        <NavLink className='list-group-item' to='search/vending-machines'>Show Vending Machines</NavLink>
                    </>
                )}

            </ul>
        </div>
    )
}
