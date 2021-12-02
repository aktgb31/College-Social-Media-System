import React from "react";
import Button from "@mui/material/Button";
// import UploadButtons from "../imguploader/imguploader";
import { Grid, Paper, TextField } from "@mui/material";
import Navbar from "../navbar/navbar";
import "./createpost.css";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom"
function CreatePost() {
  const [user, setUser] = useState({ content: "" });
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [name,setName] = useState(null);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const history = useHistory()
  useEffect(async () => {
    const resp= await fetch("/api/user/profile/me");
    const datap= await resp.json();
    try {
       const tr=datap.data.student.firstName;
       setName(tr);
    }
    catch(err) {
      const tr=datap.data.club.name;
      setName(tr);
    }});
  
  const updateDetails = () => {
    //console.log(user);
    
    const formData = new FormData();
    console.log(user.content);
    formData.append('relatedImage', selectedFile);
    formData.append('content', user.content);
    fetch("/api/post/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Post Created");
        history.push("/myposts");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error in Posting");
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
      <Navbar name={name} />

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
          value={user.content}
          placeholder="Type your content here"
          onChange={handleChange}
        ></input>
        <input
          type="file"
          name="file"
          // value={user.lastName}
          onChange={changeHandler}
        />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <Button id="update-button" variant="outlined" onClick={updateDetails}>
          Create Post
        </Button>
      </form>
    </>
  );
        }

export default CreatePost;
