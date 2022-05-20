import { React } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const Header = () => {
  return (
    <header>
      <Navbar bg="light">
    <Container>
    <Navbar.Brand href="#home">WebPanel</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#node">Node</Nav.Link>
      <NavDropdown title="SAP" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/test_sap">SAP-TEST</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/basic_sap">SAP-BASIC</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </Container>
  </Navbar>
    </header>
  )
}
