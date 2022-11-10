import './navbar.scss';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo.svg';

function NavBar() {
  return (
    <Navbar key="false" bg="light" expand="md" className="nav__container">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="image__fluid" />
        </Link>
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-false"
          aria-labelledby="offcanvasNavbar-expand-false"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbar-expand-false">
              ParkingKit
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link href="#action1">服務介紹</Nav.Link>
              <Nav.Link href="#action2">聯絡我們</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
