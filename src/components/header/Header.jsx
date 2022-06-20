import { React } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';

export const Header = ({ isMenu, setIsMenu }) => {

  return (
    <header>
      <div className='btnDashboard'>
        {isMenu ? (
          <a className='closeDashboard' onClick={() => setIsMenu(false)} title='Close Dashboard'><span></span></a>

        ) : (
          <a className='openDashboard' onClick={() => setIsMenu(true)} title='Open Dashboard'><span></span></a>
        )}
      </div>
      <Navbar>
        <div className='logo'>
          <img src="/images/logo.svg" alt="" />
          <Link to='/web-panel'><Navbar.Brand>WebPanel</Navbar.Brand></Link>
        </div>
        <Nav className="me-auto">
          <NavLink className='NavItem' to='blockchain'>Blockchain</NavLink>
          <NavLink className='NavItem' to='sapTest'>Sap-test</NavLink>
          <NavLink className='NavItem' to='sapBasic'>Sap-basic</NavLink>
        </Nav>
      </Navbar>
      <div className='wrapperBtnUser'>
        <button className='buttonUser'>
          <span>
            <div>
              <img src="/images/defaultUserIcon.svg" alt="user img" />
            </div>
          </span>
          User Name or Admin</button>
      </div>
    </header>
  )
}
