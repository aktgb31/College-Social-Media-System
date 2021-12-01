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
    const tr = dat.data.student.firstName;
    setUser(tr);
    const response= await fetch("/api/event");
    const data= await response.json();
    console.log(data);
    setPost(data.data);
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
