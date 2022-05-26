import { React } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = ({ setIsSap }) => {

  return (
    <header>
      <Navbar bg="light">
    <Container>
    <Link to='/'><Navbar.Brand>WebPanel</Navbar.Brand></Link>
    <Nav className="me-auto">
      <Link to='/'><Nav.Link href="#node">Node</Nav.Link></Link>
      <NavDropdown  title="SAP" id="collasible-nav-dropdown">
       <NavDropdown.Item> <Link to='testsap'>SAP-TEST</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to='basicsap'>SAP-BASIC</Link></NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </Container>
  </Navbar>
    </header>
  )
}
