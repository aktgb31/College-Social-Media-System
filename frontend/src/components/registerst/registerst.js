import React, { useState } from "react";
import "./registerst.css";
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
    const valid=isnitcid(emailId);
    if (firstName && lastName && emailId && valid ) {
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
      <h1>Register as Student</h1>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        placeholder="Your First Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        placeholder="Your Last Name"
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
        name="branch"
        value={user.branch}
        placeholder="Your Branch"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        name="passingYear"
        value={user.passingYear}
        placeholder="Your passingYear"
        onChange={handleChange}
      ></input>
      <input
        type="date"
        name="dob"
        value={user.dob}
        placeholder="Your Date of Birth"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="gender"
        value={user.gender}
        placeholder="Your Gender"
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
