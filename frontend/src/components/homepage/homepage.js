import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Hppost from "../hppost.js/hppost";
const Homepage = ({ setLoginUser }) => {
  return (
    <>
     <NavbarComponent/>
      <div>
        <h1>welcome to nitc social media app</h1>
      </div>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
    </>
  );
};

export default Homepage;
