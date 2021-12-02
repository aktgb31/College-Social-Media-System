import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";
import axios from "axios"
import { useEffect } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";

import {
  useHistory
} from "react-router-dom"
function Eventcreate() {
    const history = useHistory()
    const [name,setName] = useState(null);
    const [user, setUser] = useState({
        eventName: "",
        eventTime: "",
        
      });
    useEffect(async () => {
    const res= await fetch("/api/user/profile/me");
    const dat= await res.json();
    try {
       const tr=dat.data.student.firstName;
       setName(tr);
    }
  catch(err) {
    const tr=dat.data.club.name;
    setName(tr);
  }})
      const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(user);
        setUser({
          ...user,
          [name]: value,
        });
      };
      const register = () => {
        console.log(user);
        axios.post("/api/event", user, { withCredentials: true })
            .then(res => {
                alert("Event Created");
                history.push("/myevents");
            }).catch(res => alert(res.response.data.message));
        
        
      }
  return (
      <>
      <NavbarComponent name={name}/>
    <div className="login">
      <div className="form">
        <h2>Create Event Here</h2>
        <input
          type="text"
          name="eventName"
          value={user.eventName}
          placeholder="Event Name"
          onChange={handleChange}
        ></input>
        
        <input
          type="datetime-local"
          name="eventTime"
          value={user.eventTime}
          placeholder="Event Date and Time"
          onChange={handleChange}
        ></input>
        <div className="button" onClick={register}>
          Submit
        </div>
      </div>
    </div>
    </>
  );
}

export default Eventcreate;
