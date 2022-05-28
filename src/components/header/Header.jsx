import { React } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {

  return (
    <header>
      <Navbar className='wrapper'>
    <img src="logo.svg" alt="" />
    <Link to='/web-panel'><Navbar.Brand>WebPanel</Navbar.Brand></Link>
    <Nav className="me-auto">
      <NavDropdown  title="SAP" id="collasible-nav-dropdown">
       <NavDropdown.Item> <Link to='testsap'>SAP-TEST</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to='basicsap'>SAP-BASIC</Link></NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
    </header>
  )
}
