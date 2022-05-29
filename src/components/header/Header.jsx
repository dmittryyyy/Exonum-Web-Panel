import { React } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { SapTest_route } from '../../routes/constants';

import './Header.scss';

export const Header = () => {

  const navigate = useNavigate();

  return (
    <header>
      <Navbar className='wrapper'>
    <img src="logo.svg" alt="" />
    <Link to='/web-panel'><Navbar.Brand>WebPanel</Navbar.Brand></Link>
    <Nav className="me-auto">
      <NavDropdown  title="SAP" id="collasible-nav-dropdown">
       <NavDropdown.Item onClick={() => navigate(SapTest_route)}>SAP-TEST</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>SAP-BASIC</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar>
    </header>
  )
}
