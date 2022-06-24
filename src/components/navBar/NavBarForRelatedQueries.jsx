import { React } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './NavBar.scss';

export const NavBarForRelatedQueries = () => {

  return (

    <div className="navBarRelatedQueries">
      <ul className='list-group'>
        <div className='dashBoard'>
          <Link to=''><h3>Related queries</h3></Link>
          <Link to=''><img src="images/resetDashboard.png" alt="Cброс" title='Reset choose' /></Link>
        </div>
        <div className='listQueries'>

          {window.location.href.indexOf('vending-machines') >= 0 ?

            <NavLink className='list-queries-item' to='itemloaded-price'>Item loaded and price</NavLink>
            : ''}

          {window.location.href.indexOf('user-sapInfo') >= 0 ?
            <NavLink className='list-queries-item' to='realted-queries-userInfo'>Realted queries</NavLink>
            : ''}

          <NavLink className='list-queries-item' to='blockchain-profile'>Blockchain profile</NavLink>
        </div>
      </ul>
    </div>
  )

}
