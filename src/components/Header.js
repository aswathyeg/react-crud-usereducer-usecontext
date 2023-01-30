import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar variant="dark" bg="dark">
      <Container variant="dark" bg="dark">
        <Navbar.Brand variant="dark" bg="dark">
          Header
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
