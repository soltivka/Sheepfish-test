import React from "react";
import {Link, useLocation} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";
import Routing from "../../routing";

const routes = [
  {
    text: 'Products',
    route: Routing.Products
  },
  {
    text: 'Create',
    route: Routing.CreateProduct
  }
]

const Header: React.FC = () => {
  const location = useLocation();

  return <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={Routing.Products}>SheepFish test app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="me-auto">
            {routes.map(item => (
              <Nav.Link
                as={Link}
                to={item.route}
                active={location.pathname === item.route}
              >
                {item.text}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
};

export default Header;
