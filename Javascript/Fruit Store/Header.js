import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = ({ inCheckout, setInCheckout }) => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand>Cenek Fruits</Navbar.Brand>
        <Nav>
          {inCheckout ? (
            <Nav.Link onClick={() => setInCheckout(false)}>Shop</Nav.Link>
          ) : (
            <Nav.Link onClick={() => setInCheckout(true)}>Checkout</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
