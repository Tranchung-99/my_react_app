import React, { Component } from "react";
import  { Navbar, Nav, Container}  from "react-bootstrap";
//import  Nav  from "react-bootstrap";

class Header extends Component {
    render() {
      // return (
      //   <>
      //     <Navbar bg="dark" data-bs-theme="dark">
      //       <Container>
      //         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      //         <Nav className="me-auto">
      //           <Nav.Link href="#home">Home</Nav.Link>
      //           <Nav.Link href="#features">Features</Nav.Link>
      //           <Nav.Link href="#pricing">Pricing</Nav.Link>
      //         </Nav>
      //       </Container>
      //     </Navbar>
      //     <br />
      //     <Navbar bg="primary" data-bs-theme="dark">
      //       <Container>
      //         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      //         <Nav className="me-auto">
      //           <Nav.Link href="#home">Home</Nav.Link>
      //           <Nav.Link href="#features">Features</Nav.Link>
      //           <Nav.Link href="#pricing">Pricing</Nav.Link>
      //         </Nav>
      //       </Container>
      //     </Navbar>
    
      //     <br />
      //     <Navbar bg="light" data-bs-theme="light">
      //       <Container>
      //         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      //         <Nav className="me-auto">
      //           <Nav.Link href="#home">Home</Nav.Link>
      //           <Nav.Link href="#features">Features</Nav.Link>
      //           <Nav.Link href="#pricing">Pricing</Nav.Link>
      //         </Nav>
      //       </Container>
      //     </Navbar>
      //   </>
      // );

        return (
          <Container>
          <Navbar bg="light" data-bs-theme="light" expand="lg">
              <Navbar.Brand href="/">React-bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/About">About</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
          </Container>
        );
    }
}

export default Header;