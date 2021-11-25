import React from "react";
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function User() {
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
    <div>
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">USER PROFILE</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/home">
              <Button variant="contained" color="primary">
               Homepage
              </Button>
            </Link>

            
            <Navbar.Text>&nbsp;&nbsp;&nbsp;</Navbar.Text>
            <Link to="/login">
              <Button variant="contained" color="primary">
               Logout
              </Button>
            </Link>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
          />
           <TextField
            required
            id="filled-required"
            label="Last Name"
            defaultValue="Anand"
            variant="filled"
          />
          <br/>
          <TextField
            id="filled-read-only-input"
            label="Email-id"
            defaultValue="navnit_b19104040cs@nitc.ac.in"
            InputProps={{
                readOnly: true,
              }}
            variant="filled"
          /><br/>
            <TextField
            required
            id="filled-required"
            label="Branch"
            defaultValue="Computer Science"
            variant="filled"
          /><br/>
           <TextField
            required
            id="filled-required"
            label="Passing Year"
            type="number"
            defaultValue="2022"
            variant="filled"
          /><br/>
          <TextField
            required
            id="filled-required"
            label="Gender"
            defaultValue="male"
            variant="filled"
          /><br/>
          <TextField
            required
            id="filled-required"
            label="DOB"
            type="date"
            defaultValue=""
            variant="filled"
          />
        </div>
      </Box>

      <center>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Button id="update-button" variant="outlined" onClick={handleClick}>
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
    </div></div>
  );
}

export default User;
