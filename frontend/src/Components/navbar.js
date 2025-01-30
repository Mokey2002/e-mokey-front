import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink, Button } from 'reactstrap';

const NavbarComponent = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate(); // Now useNavigate() works because it's inside <BrowserRouter>

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove session
    setLoggedIn(false); // Reset state
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar color="faded" light>
      <NavbarBrand href="/" className="me-auto">
        Mokey
      </NavbarBrand>
      <Collapse navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="/landing">Home</NavLink>
          </NavItem>
          {!loggedIn ? (
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink href="/myItems">My Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/additem">Add Item</NavLink>
              </NavItem>
              <NavItem>
                <Button color="danger" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                  Logout
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
