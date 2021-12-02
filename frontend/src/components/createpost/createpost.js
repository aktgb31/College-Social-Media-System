import React from "react";
import Button from "@mui/material/Button";
// import UploadButtons from "../imguploader/imguploader";
import { Grid, Paper, TextField } from "@mui/material";
import Navbar from "../navbar/navbar";
import "./createpost.css";
import { useState } from "react";
import { useHistory } from "react-router-dom"
function CreatePost() {
  const [user, setUser] = useState({ content: "" });
  const history = useHistory()
  const updateDetails = () => {
    //console.log(user);
    fetch("/api/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Post Created");
        history.push("/myposts");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error in Updating Profile");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <>
      <Navbar />

      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <form class="form">
        <h1>Create Your Post Here</h1>

        <input
          type="text"
          name="content"
          id="content-text"
          // value={user.lastName}
          placeholder="         Type your content here"
          onChange={handleChange}
        ></input>
        <input
          type="file"
          name="lastName"
          // value={user.lastName}
          placeholder="Your Last Name"
          // onChange={handleChange}
        ></input>
        <Button id="update-button" variant="outlined" onClick={updateDetails}>
          Create Post
        </Button>
      </form>
    </>
  );
}

export default CreatePost;
