import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navigation() {
	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
			<Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
			<Navbar.Collapse>
				<Nav>
					<NavLink eventKey="1" as={Link} to="/homepage">
						Homepage
					</NavLink>
					<NavLink eventKey="2" as={Link} to="/player-search">
						Search
					</NavLink>
					<NavLink eventKey="3" as={Link} to="/teamRosters">
						Rosters
					</NavLink>
					<NavLink eventKey="4" as={Link} to="/standings">
						Standings
					</NavLink>
					<NavLink eventKey="5" as={Link} to="/player-comparison">
						Player Contribution
					</NavLink>
					<NavLink eventKey="6" as={Link} to="/history">
						History
					</NavLink>
					<NavLink eventKey="7" as={Link} to="/league-leaders">
						League Leaders
					</NavLink>
					{/* Removed Login and Sign Up Links */}
					{/* Add any other links you want always visible */}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
