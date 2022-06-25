import { React } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

export const NavBarForRelatedQueries = ({ onBlockchainProfile, onChainQueries, requestsForAllMachines }) => {

  return (

    <div className="navBarRelatedQueries">
      <ul className='list-group'>
        <div className='dashBoard'>
          <Link to=''><h3>Related queries</h3></Link>
          <Link to=''><img src="images/resetDashboard.png" alt="Cброс" title='Reset choose' /></Link>
        </div>
        <div className='listQueries'>

          {window.location.href.indexOf('vending-machines') >= 0 ?

            <button className='list-queries-item' to='itemloaded-price'  onClick={requestsForAllMachines}>Requests for all machines</button>
            : ''}

          {window.location.href.indexOf('user-sapInfo') >= 0 ?
            <button className='list-queries-item' onClick={onChainQueries}>Realted queries</button>
            : ''}

          <button className='list-queries-item' to='blockchain-profile' onClick={onBlockchainProfile}>Blockchain profile</button>
        </div>
      </ul>
    </div>
  )

}
