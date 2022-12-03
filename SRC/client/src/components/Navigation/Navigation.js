import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navigation() {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse>
        <Nav>
          <NavLink eventKey="1" as={Link} to="/homepage">
            Homepage
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/player-search">
            Player Search
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/teamRosters">
            Rosters
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
