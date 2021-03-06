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
  const forgot = () => {
    axios.post("/api/user/password/forgot", user, { withCredentials: true })
      .then(res => {
        alert(res.data.message);
        history.push("/login");
      }).catch(res => alert(res.response.data.message));
    console.log(user);
  }

  return (
    <div className="forgot">
      {console.log("User", user)}
      <div className="form">
        <h2>Reset Password</h2>
        <input
          type="text"
          name="emailId"
          value={user.emailId}
          placeholder="Your EmailId"
          onChange={handleChange}
        ></input>
        {/* <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your password"
        onChange={handleChange}
      ></input> */}
        <div className="button" onClick={forgot}>
          Send New Password
        </div></div>
    </div>
  );
};

export default Register;
