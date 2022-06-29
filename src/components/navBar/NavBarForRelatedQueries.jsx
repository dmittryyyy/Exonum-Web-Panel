import { React } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

export const NavBarForRelatedQueries = ({ onBlockchainProfile, onChainQueriesUserInfo, requestsForAllMachines, onChainQueriesUserCards }) => {

  return (

    <div className="navBarRelatedQueries">
      <ul className='list-group'>
        <div className='dashBoard'>
          <Link to=''><h3>Related queries</h3></Link>
        </div>

        <div className='listQueries'>
        {requestsForAllMachines}

        {onChainQueriesUserInfo}

        {onChainQueriesUserCards}

        {onBlockchainProfile}

        </div>
      </ul>
    </div>
  )

}
