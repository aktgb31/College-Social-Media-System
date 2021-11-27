import React from "react";
import Button from "@mui/material/Button";
// import UploadButtons from "../imguploader/imguploader";
import { Grid, Paper, TextField } from "@mui/material";
import Navbar  from "../navbar/navbar";
import "./createpost.css";

function CreatePost() {
  return (
    <>
    
    <Navbar/>
      
       <div>&nbsp;&nbsp;</div>
       <div>&nbsp;&nbsp;</div>
       <div>&nbsp;&nbsp;</div>
       <div>&nbsp;&nbsp;</div>
        <form class="form">
           <h1>Create Your Post Here</h1> 
         
        <input
        type="text"
        name="content" id="content-text"
        // value={user.lastName}
        placeholder="         Type your content here"
        // onChange={handleChange}
      ></input>
              <input
        type="file"
        name="lastName"
        // value={user.lastName}
        placeholder="Your Last Name"
        // onChange={handleChange}
      ></input>
      <div className="button">
        Post
      </div>
        </form>
    </>
  );
}

export default CreatePost;
