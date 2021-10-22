import React, { useState } from "react";
import "./forgot.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    branch: "",
    passingYear: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };

  function isnitcid(emailId) {
    let lastpart = emailId.slice(-11);
    console.log(lastpart);
    if (lastpart == "@nitc.ac.in") {
      return true;
    } else {
      return false;
    }
  }

  const register = () => {
    const {
      firstName,
      lastName,
      emailId,
      branch,
      passingYear,
      dob,
      gender,
    } = user;
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Forgot</h1>
      <input
        type="text"
        name="emailId"
        value={user.emailId}
        placeholder="Your EmailId"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={() => history.push("/login")}>
        Reset Password
      </div>
    </div>
  );
};

export default Register;
