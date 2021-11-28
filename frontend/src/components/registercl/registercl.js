import React, { useState } from "react";
import "./registercl.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
      name:"",
      emailId:"",
      clubType:"",
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
        name,
        emailId,
        clubType
    } = user;
    const valid=isnitcid(emailId);
    if (name && clubType && emailId && valid ) {
      axios.post("http://localhost:4444/api/user/register/club", user).then((res) => {
        alert(res.data.message);
      });
      console.log(isnitcid(emailId));
      history.push("/login");
      alert("Response Saved");
    } else {
      alert("invlid input");
    }
  };

  return (
    <div className="register">
      <div className="form">
      {console.log("User", user)}
      <center><h2>Register as Club</h2></center>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Club Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="emailId"
        value={user.emailId}
        placeholder="Your EmailId"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="clubType"
        value={user.clubType}
        placeholder="Club Type"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div></div>
  );
};

export default Register;
