import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Myhppost from "../hppost/myhppost";
import { Link } from "react-router-dom";
import axios from "axios"
const Myposts = () => {
  const [post,setPost] = useState([]);
  const [user,setUser] = useState(null);
  const [id, setId] = useState();
  useEffect(async () => {
    const response= await fetch("/api/post");
    const data= await response.json();
    setPost(data.data);
    const res= await fetch("/api/user/profile/me");
    const dat= await res.json();
    try {
       const tr=dat.data.student.firstName;
       setUser(tr);
    }
  catch(err) {
    const tr=dat.data.club.name;
    setUser(tr);
  }
  const id = dat.data.userId;
    
    setId(id)
    console.log({id});
    const pstresponse = await axios.get('/api/post', {
      params: {
        userId: id
      }, 
      withCredentials: true
    
    })
    
    // const data = await response.json();
    // console.log(data);
    setPost(pstresponse.data.data);
    console.log(pstresponse)
    
    
  },[])
  return (
    <>
     <NavbarComponent name={user}/>
        <center><h1>Myposts< Link to = "/home"
             > <center>< Button variant = "primary" id = "show-thread-btn" > All Posts </Button> </center></Link >
            
            <div>&nbsp;</div></h1></center>
        
        {post.map( (postdetails)=>{
            return<Myhppost title="home" id_={postdetails.postId} author={postdetails.creatorId} content={postdetails.content} postId={postdetails.postId}/>
        
        })}
      {/* <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/> */}
    </>
  );
};

export default Myposts;