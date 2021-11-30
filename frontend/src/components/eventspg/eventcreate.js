import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";
import axios from "axios"
import { BsChevronCompactLeft } from "react-icons/bs";


function Eventcreate() {
    const [user, setUser] = useState({
        eventName: "",
        eventTime: "",
        
      });
    
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
                alert("Response Saved");
            }).catch(res => alert(res.response.data.message));
        
        
      }
  return (
      <>
      <NavbarComponent/>
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
