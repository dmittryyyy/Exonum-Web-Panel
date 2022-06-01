import { React } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {

  return (
    <header>
      <Navbar className='wrapper'>
    <img src="logo.svg" alt="" />
    <Link to='/web-panel'><Navbar.Brand>WebPanel</Navbar.Brand></Link>
    <Nav className="me-auto">
       <NavLink className='NavItem' to='sapTest'>SAP-TEST</NavLink>
       <NavLink className='NavItem' to='sapBasic'>SAP-BASIC</NavLink>
    </Nav>
  </Navbar>
    </header>
  )
}
