import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
import Hppost from "../hppost/hppost";
const Homepage = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    let qw = data.data;
    await Promise.all(qw.map(async (item) => {
      const resp = await fetch(`/api/user/profile/?userId=${item.creatorId}`);
      const dat = await resp.json();
      if (dat.data.userType == "STUDENT")
        item.creatorId = dat.data.student.firstName + " " + dat.data.student.lastName;
      else
        item.creatorId = dat.data.club.name;
        return item;
    }
    )).then(qw => {
      console.log(qw)
      setPost(qw);
    });
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
       if (dat.data.userType == "STUDENT"){
      const tr = dat.data.student.firstName + " " + dat.data.student.lastName;
      setUser(tr);
    }
    else {
      const tr = dat.data.club.name;
      setUser(tr);
    }


  }, [])
  return (
    <>
      <NavbarComponent name={user} />
      <center><h1>HOMEPAGE
        < Link to="/myposts"
        > <center>< Button variant="primary" id="show-thread-btn" > My Posts </Button> </center></Link >

        <div>&nbsp;</div></h1></center>

      {post.map((postdetails) => {
        // const resp= await fetch(`/api/user/profile/?userId=${postdetails.creatorId}`);
        // const dat = await resp.json();
        // console.log(dat)
        return <Hppost title="" id_={postdetails.postId} author={postdetails.creatorId} content={postdetails.content} />

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
