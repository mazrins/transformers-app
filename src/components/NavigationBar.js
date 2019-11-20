import React from 'react';
import { NavDropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function NavigationBar(props) {
    return (
        <div className="navbar-class">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to={"/"}>Transformers</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Filter by faction" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => props.filterByFaction("Autobots")}>Autobots</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => props.filterByFaction("Decepticons")}>Decepticons</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => props.filterByFaction("All")}>All transformers</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Link to={"/add-transformer"}>Add transformer</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    )
}
