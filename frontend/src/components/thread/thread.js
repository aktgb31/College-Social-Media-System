import React from 'react'
import NavbarComponent from '../navbar/navbar'
import Threadcomponent from './threadcomponent'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./thread.css";
import { useState } from 'react'
import { useEffect } from 'react'

function Thread() {
    const [post,setPost] = useState([]);
    const [user,setUser] = useState();
    useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    try {
       const tr=dat.data.student.firstName;
       setUser(tr);
    }
  catch(err) {
    const tr=dat.data.club.name;
    setUser(tr);
  }
    const response= await fetch("/api/thread");
    const data= await response.json();

    console.log(data);
    setPost(data.data);
  },[])
    return (
        <div>
            <NavbarComponent name={user}/>
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <div id="thread-box">
            <div>
            <h2 id="thread-title">THREADS</h2>
            <div id="full-thread-btn">
            <Link to="/createthread"><Button variant="primary" id="show-thread-btn">Create Thread</Button> </Link>
            </div>
            <div id="full-thread-btn">
            < Link to = "/mythread"
             > < Button variant = "primary" id = "show-thread-btn" > My Threads </Button> </Link >
            </div>
            <div>&nbsp;</div>
            {/* <Threadcomponent name="CP vs DEV" author="Kunal" />*/}
            {post.map( (postdetails)=>{
            return <Threadcomponent id_={postdetails.threadId} name={postdetails.threadTitle} author={postdetails.creatorId} /> 
        
        })}</div></div>
        </div>
    )
}

export default Thread
