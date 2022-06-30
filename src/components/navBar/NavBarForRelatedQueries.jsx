import { React } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './NavBar.scss';

export const NavBarForRelatedQueries = ({ onBlockchainProfile, onChainQueriesUserInfo, requestsForAllMachines, onChainQueriesUserCards, isErrorRelQuer }) => {

  return (
    <>
    <div className="navBarRelatedQueries">
      <ul className='list-group'>
        <div className='dashBoard'>
          <Link to=''><h3>Related queries</h3></Link>
        </div>

        <div className='listQueries'>

        {onBlockchainProfile}

        {requestsForAllMachines}

        {onChainQueriesUserInfo}

        {onChainQueriesUserCards}

        </div>
      </ul>
    </div>

    <ErrorMessage errorInput={isErrorRelQuer}/>
    </>
  )

}
