import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" className={styles.navbar} expand="lg">
      <>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.nav}>
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
              className={styles.navLink}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/products"
              active={location.pathname === "/products"}
              className={styles.navLink}
            >
              Products
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>

      <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
        SheepFish test app
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
