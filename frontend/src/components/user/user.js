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
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function User() {
  const [user, setUser] = useState({
    firstName: "Navnit",
    lastName: "Anand",
    emailId: "navnit_b190404cs@nitc.ac.in",
    branch: "CSE",
    passingYear: "2023",
    dob: "28-04-2001",
    gender: "male",
  });
  useEffect(async () => {
  const response= await fetch("/api/user/profile/me");
  const data= await response.json();
  console.log(data);
  const tr=data.data;
  const qw={
    firstName: tr.student.firstName,
    lastName: tr.student.lastName,
    emailId: tr.emailId,
    branch: tr.student.branch,
    passingYear: tr.student.passingYear,
    dob: tr.student.dob,
    gender: tr.student.gender,
  }
  setUser(qw);
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
            id="filled-required"
            label="First Name"
            defaultValue="Navnit"
            variant="filled"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
           <TextField
            required
            id="filled-required"
            label="Last Name"
            defaultValue="Anand"
            variant="filled"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          <br/>
          <TextField
            id="filled-read-only-input"
            label="Email-id"
            defaultValue="navnit_b19104040cs@nitc.ac.in"
            InputProps={{
                readOnly: true,
              }}
              name="emailId"
            value={user.emailId}
            variant="filled"
            onChange={handleChange}
          /><br/>
            <TextField
            required
            id="filled-required"
            label="Branch"
            defaultValue="Computer Science"
            variant="filled"
            name="branch"
            value={user.branch}
            onChange={handleChange}
          /><br/>
           <TextField
            required
            id="filled-required"
            label="Passing Year"
            type="number"
            defaultValue="2022"
            variant="filled"
            name="passingYear"
            value={user.passingYear}
            onChange={handleChange}
          /><br/>
          <TextField
            required
            id="filled-required"
            label="Gender"
            defaultValue="male"
            variant="filled"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          /><br/>
          <TextField
            required
            id="filled-required"
            label="DOB"
            type="date"
            defaultValue=""
            variant="filled"
            name="dob"
            value={user.dob}
            onChange={handleChange}
          />
        </div>
      </Box>

      <center>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Button id="update-button" variant="outlined" onClick={updateDetails}>
        Update Details
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Details updated successfully!
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
      </center>
    </div></>
  );
}

export default User;
