import React, { useState } from "react";
import "../registercl/registercl.css";
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

    axios.post("/api/user/register/student", user, { withCredentials: true }).then((res) => {
      alert(res.data.message);
      history.push("/login");
    }).catch(err => alert(err.response.data.message));


  };

  return (
    <div className="register" id="register-form">
      {console.log("User", user)}
      <div className="form" id="form-id">
        <h2>Register as Student</h2>
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
      </div></div>
  );
};

export default Register;
