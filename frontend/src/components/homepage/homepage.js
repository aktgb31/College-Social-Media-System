import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Hppost from "../hppost/hppost";
const Homepage = () => {
  const [post,setPost] = useState([]);
  const [user,setUser] = useState(null);
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
    
    
  },[])
  return (
    <>
     <NavbarComponent name={user}/>
        <center><h1>HOMEPAGE</h1></center>
        {post.map( (postdetails)=>{
            return<Hppost title="home" id_={postdetails.postId} author={postdetails.creatorId} content={postdetails.content}/>
        
        })}
      {/* <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/> */}
    </>
  );
};

export default Homepage;

// let data=qs.stringify({"userId":`${postdetails.creatorId}`});
            // console.log(data);
            // const userDetail=await axios({url:'/api/user/profile',method:'get', headers: { 
            //   'Content-Type': 'application/x-www-form-urlencoded'
            // },data:data},{withCredentials:true}).catch(res => console.log(res.response.data.message));;
            // console.log(userDetail);
            // let name;
            // name=userDetail.name;
            // if(userDetail.firstName && userDetail.lastName)
            //   name=userDetail.firstName+" "+userDetail.lastName;
            