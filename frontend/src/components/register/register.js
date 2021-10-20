import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    fname: "",
    lname:"",
    email: "",
    password: "",
    branch: "",
    year: "",
    dob: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };

    function isnitcid(email){
        let lastpart= email.slice(-11)
        console.log(lastpart)
        if(lastpart=='@nitc.ac.in'){
            return true
        }
        else{
            return false
        }
    }  

  const register = () => {
    const { fname, lname,email, password,branch,year,dob } = user;
    if (fname && lname && email && password ) {
      axios.post("http://localhost:4444/register", user).then((res) => {
        alert(res.data.message);
      });
      console.log(isnitcid(email))
      history.push("/login");
      alert("Response Saved");
    } else {
      alert("invlid input");
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="fname"
        value={user.fname}
        placeholder="Your First Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="lname"
        value={user.lname}
        placeholder="Your Last Name"
        onChange={handleChange}
      ></input>
     
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
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
        name="year"
        value={user.year}
        placeholder="Your Year"
        onChange={handleChange}
      ></input>
        <input
        type="date"
        name="dob"
        value={user.dob}
        placeholder="Your Date of Birth"
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
