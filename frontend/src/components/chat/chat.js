import React from 'react'
import NavbarComponent from '../navbar/navbar'
import { useEffect } from "react";
import { useState } from "react";
import PeopleComponent from '../people/people';
import "../people/people.css";

function Chat() {
    const [post,setPost] = useState([]);
  useEffect(async () => {
    const response= await fetch("/api/user");
    const data= await response.json();
    console.log(data);
    setPost(data.data);
  },[])
    return (
        <>
            <NavbarComponent />
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <div id="chat-box">
            <div>
            <h2 id="chat-title">&nbsp;CHAT</h2>
            {post.map( (postdetails)=>{
             const username=   postdetails.emailId.split("_")[0].toUpperCase();
            return<PeopleComponent author={username}/>
        
        })}
            
            
            
        </div></div></>
    )
}

export default Chat
//indonesia-idr
//bulgaria -bgn
