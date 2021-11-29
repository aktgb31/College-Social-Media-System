import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Hppost from "../hppost/hppost";
const Homepage = () => {
  return (
    <>
     <NavbarComponent/>
      
        <center><h1>HOMEPAGE</h1></center>
     
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
    </>
  );
};

export default Homepage;
