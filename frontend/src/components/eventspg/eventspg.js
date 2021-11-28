import React from 'react'
import NavbarComponent from '../navbar/navbar'
import EventComponent from './eventscmp'
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./event.css";

function Eventspg() {
    return (
        <div>
            <NavbarComponent/>
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <div id="event-box">
            <div>
            <h2 id="event-title">Events Page</h2>
            <div id="full-event-btn">
            <Link to="/eventcreate"><Button variant="primary" id="event-btn">Create Event</Button></Link></div>
            <div id="full-event-btn">
            <Link to="/myevents"><Button variant="primary" id="event-btn">My Events</Button></Link></div>
            <br></br>
            <EventComponent name="Tathva 2022" time="22nd July 2022" author="Mihir Gokhale"/>
        </div></div></div>
    )
}

export default Eventspg
