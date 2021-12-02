import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaRegPlusSquare } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillCalendarEventFill } from 'react-icons/bs';

import { FaSearch } from 'react-icons/fa';
import {ImExit} from 'react-icons/im';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "@mui/material";
import axios from "axios"
import { useHistory } from "react-router-dom"

function NavbarComponent(props) {
  const history = useHistory()

    
  const logout = () => {
        axios.post("/api/user/logout")
            .then(res => {
                history.push("/login");
            }).catch(res => alert(res.response.data.message));
        
    }
  return (
    <div >
      <Navbar id="nav-id" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home" >COLLEGE SOCIAL MEDIA SYSTEM</Navbar.Brand>
          <Navbar.Toggle />
            
          <Navbar.Collapse className="justify-content-end" id="nav-nav">
            <div class="input-group" id="search-outer">
            <div id="input-outer">
              <input type="search" placeholder="search user by name" id="form1" class="form-control" />
              <label class="form-label" for="form1">Search</label>
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <button type="button" id="btn-nav">
              <FaSearch/>
            </button>
            </div>
            
            
            <Link to="/createpost">
              <Button variant="contained" color="primary" id="btn-nav">
                <FaRegPlusSquare className="App-logo"/>
              </Button>
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Link to="/thread">
              <Button variant="contained" color="primary" id="btn-nav" >
                
                <MdGroups className="App-logo"/>
              </Button>
            </Link>
            <Navbar.Text>&nbsp;&nbsp;</Navbar.Text>
            <Link to="/event">
              <Button variant="contained" color="primary" id="btn-nav">
                
                <BsFillCalendarEventFill className="App-logo"/>
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
                {props.name}&nbsp;
               <BsFillPersonFill className="App-logo"/> 
              </Button></Link>
            </Navbar.Text>
            <Navbar.Text>&nbsp;</Navbar.Text>
            <Navbar.Text>
              <Link to="/login"> <Button onClick={logout} variant="contained" color="primary" id="btn-nav">
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
