import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";

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
      <div className="register" id="register-form">
        <div className="form" id="form-id">
          <h2>Create Thread Here</h2>
          <input
            type="text"
            name="threadName"
            value={user.threadName}
            placeholder="Event Name"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="threadAuthor"
            value={user.threadAuthor}
            placeholder="Event Author"
            onChange={handleChange}
          ></input>
          <div className="button" onClick={register}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createthread;
