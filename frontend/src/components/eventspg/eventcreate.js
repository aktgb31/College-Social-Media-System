import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";

function Eventcreate() {
    const [user, setUser] = useState({
        eventName: "",
        eventDate: "",
        eventAuthor: ""
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
          alert("Response Saved");
      }
  return (
      <>
      <NavbarComponent/>
    <div className="register" id="register-form">
      <div className="form" id="form-id">
        <h2>Create Event Here</h2>
        <input
          type="text"
          name="eventName"
          value={user.eventName}
          placeholder="Event Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="eventAuthor"
          value={user.eventAuthor}
          placeholder="Event Author"
          onChange={handleChange}
        ></input>
        <input
          type="date"
          name="eventDate"
          value={user.eventDate}
          placeholder="Event Date"
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
