import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";
import "./thread.css";

function Createthread() {
    const [user, setUser] = useState({
        threadName: "",
        threadAuthor: ""
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
    <div>
      <NavbarComponent />
      <div className="login" >
        <div className="form" >
          <h2>Create Thread Here</h2>
          <input
            type="text"
            name="threadName"
            value={user.threadName}
            placeholder="Thread Name"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="threadAuthor"
            value={user.threadAuthor}
            placeholder="Thread Author"
            onChange={handleChange}
          ></input>
          <div className="button" id="thread-btn" onClick={register}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createthread;
