import React from "react";
import Button from "@mui/material/Button";
// import UploadButtons from "../imguploader/imguploader";
import { Grid, Paper, TextField } from "@mui/material";
import Navbar from "../navbar/navbar";
import "./createpost.css";
import { useState } from "react";
function CreatePost() {
  const [user, setUser] = useState({ content: "" });
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
  const updateDetails = () => {
    //console.log(user);
    const formData = new FormData();
    console.log(user.content);
    formData.append('File', selectedFile);
    formData.append('content', user.content);
    fetch("/api/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
