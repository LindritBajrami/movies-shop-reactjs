import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const [cart, setCart] = useLocalStorage('cart')
  const [user, setUser] = useLocalStorage('loggedin')

  const handleLogout = e => {
    e.preventDefault()
    setUser(undefined)
    window.location.href = '/'
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Movies Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/favourites">Favourites</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/cart">Cart ({(cart != undefined && cart.length) && cart.length})</Nav.Link>
            <NavDropdown title={user ? user.fullname : 'Guest'} id="basic-nav-dropdown">
              {
                (user != undefined) ? <>
                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                </> : <>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
