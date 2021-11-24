import React from "react";
import Button from "@mui/material/Button";
// import UploadButtons from "../imguploader/imguploader";
import { Grid, Paper, TextField } from "@mui/material";
import Navbar  from "../navbar/navbar";
function CreatePost() {
  return (
    <>
    
    <Navbar/>
      <h1>Create Your Post Here</h1>
        <form class="form">
        <input
        type="text"
        name="content"
        // value={user.lastName}
        placeholder="Type your content here"
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
