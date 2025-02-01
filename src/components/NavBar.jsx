import { useContext } from 'react';
import { MiContexto } from '../context/MiContexto';
import { UserContext } from '../context/UserContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormatoMiles from './FormatoMiles';

const NavBar = () => {
  const { total } = useContext(MiContexto);
    const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🍕 MammaMia
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            
            {token ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
            
            <Nav.Link as={Link} to="/cart" className="mx-2 d-flex align-items-center">
              🛒 $<FormatoMiles numero={total} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;