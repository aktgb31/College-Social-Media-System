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
import CardMedia from "@mui/material/CardMedia";
import "./user.css";
import TextField from "@mui/material/TextField";
import { FaHome } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { useEffect } from "react";
import NavbarComponent from "../navbar/navbar";
import axios from "axios"
import { useHistory } from "react-router-dom"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function User() {
  const history = useHistory()
  const [user, setUser] = useState({
    firstName: "Navnit",
    lastName: "Anand",
    name: "clubname",
    clubType: "Technical",
    emailId: "navnit_b190404cs@nitc.ac.in",
    branch: "CSE",
    passingYear: "2023",
    dob: "28-04-2001",
    gender: "male",
    newPassword: "",
    userType: "",
  });
  useEffect(async () => {
    const response = await fetch("/api/user/profile/me");
    const data = await response.json();
    console.log(data);
    const tr = data.data;

    if (tr.userType == 'STUDENT') {
      const qw = {
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
    else {
      const qw = {
        name: tr.club.name,
        userType: tr.userType,
        emailId: tr.emailId,
        clubType: tr.club.userType,

      }
      setUser(qw);

    }
  }, [])
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
  const deleteprofile = () => {
    // console.log(props.eventId);
    axios.delete("/api/user/delete")
      .then(res => {
        alert("Profile Deleted");
        history.push("/login");
      }).catch(res => alert(res.response.data.message));


  }

  const reset = () => {

    axios.put("/api/user/password/change",  { newPassword: user.newPassword }, { withCredentials: true })
      .then(res => {
        alert('Password changed');
        history.push("/user");

      }).catch(res => alert(res.response.data.message));
    console.log(user.newPassword);
  }
  if (user.userType == "STUDENT") {
    if (user.gender == "MALE") {
      return (

        <>
          <div>
            <NavbarComponent name={user.firstName} />
          </div>
          <div className="userdetails">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "35ch", height: "10ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div id="innerform">
                <center><CardMedia height="auto"
                  alt="Paella dish">
                  <img src="male.png" />
                </CardMedia></center>
                <TextField
                  required
                  id="filled-required"
                  label="First Name"
                  defaultValue=""
                  variant="filled"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="filled-required"
                  label="Last Name"
                  defaultValue=""
                  variant="filled"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
                <br />
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
                  id="filled-required"
                  label="Branch"
                  defaultValue=""
                  variant="filled"
                  name="branch"
                  value={user.branch}
                  onChange={handleChange}
                /><br />
                <TextField
                  required
                  id="filled-required"
                  label="Passing Year"
                  type="number"
                  defaultValue=""
                  variant="filled"
                  name="passingYear"
                  value={user.passingYear}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="filled-required"
                  label="Gender"
                  defaultValue=""
                  variant="filled"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                /><br />
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
                <input id="pass-change" type="text" name="newPassword" placeholder="Enter your Email ID" value={user.newPassword} onChange={handleChange} placeholder="Enter your Password" ></input>
                <Button id="reset-button" className="button" onClick={reset} >Reset password</Button>
                <Button id="delete-button" className="button" onClick={deleteprofile} >DELETE USER PROFILE</Button>
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
    else {
      return (

        <>
          <div>
            <NavbarComponent name={user.firstName} />
          </div>
          <div className="userdetails">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "35ch", height: "10ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div id="innerform">
                <center><CardMedia height="auto"
                  alt="Paella dish">
                  <img src="female.png" />
                </CardMedia></center>
                <TextField
                  required
                  id="filled-required"
                  label="First Name"
                  defaultValue=""
                  variant="filled"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="filled-required"
                  label="Last Name"
                  defaultValue=""
                  variant="filled"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
                <br />
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
                  id="filled-required"
                  label="Branch"
                  defaultValue=""
                  variant="filled"
                  name="branch"
                  value={user.branch}
                  onChange={handleChange}
                /><br />
                <TextField
                  required
                  id="filled-required"
                  label="Passing Year"
                  type="number"
                  defaultValue=""
                  variant="filled"
                  name="passingYear"
                  value={user.passingYear}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="filled-required"
                  label="Gender"
                  defaultValue=""
                  variant="filled"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                /><br />
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
                <input id="pass-change" type="text" name="newPassword" placeholder="Enter your Email ID" value={user.newPassword} onChange={handleChange} placeholder="Enter your Password" ></input>
                <Button id="reset-button" className="button" onClick={reset} >Reset password</Button>
                <Button id="delete-button" className="button" onClick={deleteprofile} >DELETE USER PROFILE</Button>
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
  }
  else {
    return (

      <>
        <div>
          <NavbarComponent name={user.name} />
        </div>
        <div className="userdetails">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch", height: "10ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div id="innerform">
              <center><CardMedia height="auto"
                alt="Paella dish">
                <img src="club.png" />
              </CardMedia></center>
              <TextField
                required
                id="filled-required"
                label="Club Name"
                defaultValue=""
                variant="filled"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                required
                id="filled-required"
                label="Club Type"
                defaultValue=""
                variant="filled"
                name="clubType"
                value={user.clubType}
                onChange={handleChange}
              />
              <br />
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
              <Button id="update-button" variant="outlined" onClick={updateDetails}>
                Update Details
              </Button>
              <input id="pass-change" type="text" name="newPassword" placeholder="Enter your Email ID" value={user.newPassword} onChange={handleChange} placeholder="Enter your Password" ></input>
              <Button id="reset-button" className="button" onClick={reset} >Reset password</Button>
              <Button id="delete-button" className="button" onClick={deleteprofile} >DELETE USER PROFILE</Button>
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
}

export default User;
