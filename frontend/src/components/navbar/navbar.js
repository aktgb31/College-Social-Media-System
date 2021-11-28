import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaRegPlusSquare } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import {ImExit} from 'react-icons/im';
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
                <FaRegPlusSquare/>
              </Button>
            </Link>
            <Link to="/thread">
              <Button variant="contained" color="primary" id="btn-nav">
                
                thread
              </Button>
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Link to="/chat">
              <Button variant="contained" color="primary" id="btn-nav">
                <FaFacebookMessenger className="App-logo"/>
              </Button>
              
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Navbar.Text>
               
              <Link to="/user"> <Button variant="contained" color="primary" id="btn-nav">
                Navneet&nbsp;
               <BsFillPersonFill/> 
              </Button></Link>
            </Navbar.Text>
            <Navbar.Text>&nbsp;</Navbar.Text>
            <Navbar.Text>
              <Link to="/login"> <Button variant="contained" color="primary" id="btn-nav">
               <ImExit/> 
              </Button></Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
