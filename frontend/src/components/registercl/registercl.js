import React, { useState } from "react";
import "./registercl.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
      clubName:"",
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
        clubName,
        emailId,
        clubType
    } = user;
    const valid=isnitcid(emailId);
    if (clubName && clubType && emailId && valid ) {
      axios.post("/user/register", user).then((res) => {
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
      {console.log("User", user)}
      <h1>Register as Club</h1>
      <input
        type="text"
        name="clubName"
        value={user.clubName}
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
    </div>
  );
};

export default Register;
