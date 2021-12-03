import React from "react";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Container from "react-bootstrap/Container";
import "./user.css";
import TextField from "@mui/material/TextField";
import { FaHome } from 'react-icons/fa';
import {ImExit} from 'react-icons/im';
import { useEffect } from "react";
import NavbarComponent from "../navbar/navbar";
import axios from "axios"
import { useHistory } from "react-router-dom"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function Otheruser() {
  const history = useHistory()
  const [user, setUser] = useState({
    firstName: "Navnit",
    lastName: "Anand",
    name:"clubname",
    clubType:"Technical",
    emailId: "navnit_b190404cs@nitc.ac.in",
    branch: "CSE",
    passingYear: "2023",
    dob: "28-04-2001",
    gender: "male",
    newPassword:"",
    userType:"",
  });
  useEffect(async () => {
  const response= await fetch("/api/user/profile/me");
  const data= await response.json();
  console.log(data);
  const tr=data.data;
  
  if(tr.userType=='STUDENT'){
    const qw={
    firstName: tr.student.firstName,
    lastName: tr.student.lastName,
    emailId: tr.emailId,
    branch: tr.student.branch,
    passingYear: tr.student.passingYear,
    dob: tr.student.dob,
    gender: tr.student.gender,
    userType: tr.userType,
  }
  setUser(qw);

  }
  else{
    const qw={
    name: tr.club.name,
   userType: tr.userType,
    emailId: tr.emailId,
    clubType: tr.club.userType,
    
  }
  setUser(qw);

  }
},[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const updateDetails = () => {
    console.log(user);
    fetch("/api/user/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Profile updated");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error in Updating Profile");
      });
  };
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
   
    
  if(user.userType=="STUDENT"){
    return (
    
    <>
    <div>
    <NavbarComponent name={user.firstName}/>
    </div>
    <div className="userdetails">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch",height:"10ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div id="innerform">
          <TextField
            required
            id="filled-read-only-input"
            label="First Name"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
           <TextField
            required
            id="filled-read-only-input"
            label="Last Name"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          <br/>
          <TextField
            id="filled-read-only-input"
            label="Email-id"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
              name="emailId"
            value={user.emailId}
            variant="filled"
            onChange={handleChange}
          />
            <TextField
            required
            id="filled-read-only-input"
            label="Branch"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="branch"
            value={user.branch}
            onChange={handleChange}
          /><br/>
           <TextField
            required
            id="filled-read-only-input"
            label="Passing Year"
            type="number"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="passingYear"
            value={user.passingYear}
            onChange={handleChange}
          />
          <TextField
            required
            id="filled-read-only-input"
            label="Gender"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          /><br/>
          <TextField
            required
            id="filled-read-only-input"
            label="DOB"
            type="date"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="dob"
            value={user.dob}
            onChange={handleChange}
          />
        </div>
      </Box>

      <center>
      <Stack spacing={2} sx={{ width: '100%' }}>
     
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
      </center>
    </div></>
  );
    }
  else{
        return (
    
    <>
    <div>
    <NavbarComponent name={user.name}/>
    </div>
    <div className="userdetails">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch",height:"10ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div id="innerform">
          <TextField
            required
            id="filled-read-only-input"
            label="Club Name"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
           <TextField
            required
            id="filled-read-only-input"
            label="Club Type"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
            name="clubType"
            value={user.clubType}
            onChange={handleChange}
          />
          <br/>
          <TextField
            id="filled-read-only-input"
            label="Email-id"
            defaultValue=""
            InputProps={{
                readOnly: true,
              }}
              name="emailId"
            value={user.emailId}
            variant="filled"
            onChange={handleChange}
          />
           
        </div>
      </Box>

      <center>
      <Stack spacing={2} sx={{ width: '100%' }}>
     
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
      </center>
    </div></>
  );

  }
}

export default Otheruser;