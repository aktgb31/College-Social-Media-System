import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "@mui/material";
function NavbarComponent() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home" >COLLEGE SOCIAL MEDIA SYSTEM</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/createpost">
              <Button variant="contained" color="primary" id="btn-nav">
                Create Post
              </Button>
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Link to="/chat">
              <Button variant="contained" color="primary" id="btn-nav">
                Chat
              </Button>
              
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Navbar.Text>
              Signed in as : <a href="user">Navnit</a>
            </Navbar.Text>
            <Navbar.Text>&nbsp;</Navbar.Text>
            <Navbar.Text>
              Logout: <Link to="/login">logout</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
