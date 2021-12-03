import React from 'react'
import NavbarComponent from '../navbar/navbar'
import EventComponent from './eventscmp'
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./event.css";
import { useState } from 'react'
import { useEffect } from 'react'

function Eventspg() {
    const [post,setPost] = useState([]);
    const [user, setUser] = useState();
    useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    if(dat.data.userType=="STUDENT") {
       const tr=dat.data.student.firstName+" "+dat.data.student.lastName;
       setUser(tr);
    }
  else {
    const tr=dat.data.club.name;
    setUser(tr);
  }
  const response= await fetch("/api/event");
    const data= await response.json();
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
    
    
    
    },[])
    return (
        <div>
            <NavbarComponent name={user}/>
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <div id="event-box">
            <div>
            <h2 id="event-title">Events Page</h2>
            <div id="full-event-btn">
            <Link to="/eventcreate"><Button variant="primary" id="event-btn">Create Event</Button></Link></div>
            <div id="full-event-btn">
            <Link to="/myevents"><Button variant="primary" id="event-btn">My Events</Button></Link></div>
            <br></br>
            <div>&nbsp;</div>
            {post.map( (postdetails)=>{
            return <EventComponent name={postdetails.eventName} time={postdetails.eventTime} author={postdetails.creatorId}/>
        
        })}
           
        </div></div></div>
    )
}

export default Eventspg
