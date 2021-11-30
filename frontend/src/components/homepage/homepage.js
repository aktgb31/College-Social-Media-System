import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Hppost from "../hppost/hppost";
const Homepage = () => {
  const [post,setPost] = useState([]);
  useEffect(async () => {
    const response= await fetch("/api/post");
    const data= await response.json();
    console.log(data);
    setPost(data.data);
  },[])
  return (
    <>
     <NavbarComponent/>
      
        <center><h1>HOMEPAGE</h1></center>
        {post.map( (postdetails)=>{
            return<Hppost title="home" author={postdetails.creatorId} content={postdetails.content}/>
        
        })}
      {/* <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/> */}
    </>
  );
};

export default Homepage;
