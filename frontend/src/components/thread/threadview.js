import React from "react";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import { useLocation } from "react-router-dom";
import ThreadMessage from "./threadMessage";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Button from "react-bootstrap/Button";
import "./thread.css";
import Hppost from "../hppost/hppost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom"

function ThreadView() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [threadName, setThreadName] = useState("");
  const search = useLocation().search;
  const currthreadId = new URLSearchParams(search).get("threadId");
  console.log(currthreadId);
  useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    if (dat.data.userType == "STUDENT") {
      const tr = dat.data.student.firstName + " " + dat.data.student.lastName;
      setUser(tr);
    }
    else {
      const tr = dat.data.club.name;
      setUser(tr);
    }
    // const id = dat.data.userId;

    //   setId(id)
    //   console.log({id});
    const pstresponse = await axios.get('/api/thread', {
      params: {
        threadId: currthreadId
      },
      withCredentials: true

    })
    let qw = pstresponse.data.data[0].posts;
    await Promise.all(qw.map(async (item) => {
      const resp = await fetch(`/api/user/profile/?userId=${item.creatorId}`);
      const dat = await resp.json();
      if (dat.data.userType == "STUDENT")
        item.creatorId = dat.data.student.firstName + " " + dat.data.student.lastName;
      else
        item.creatorId = dat.data.club.name;
      return item;
    }
    )).then(qw => {
      setPost(qw);
    });
    // const data = await response.json();
    // console.log(data);
    //    setPost(pstresponse.data.data[0].posts);
    setThreadName(pstresponse.data.data[0].threadTitle);

  }, [])
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [content, setContent] = useState({ content: "" });
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const history = useHistory()
  const updateDetails = () => {
    //console.log(user);
    const formData = new FormData();
    console.log(content.content);
    formData.append('relatedImage', selectedFile);
    formData.append('content', content.content);
    formData.append('threadId', currthreadId);
    fetch("/api/post/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if(data.success==false)
        {
          console.error("Error:",data.message);
        alert("Error in Posting");
        }
        else
        {alert("Message sent in thread");
        history.push("/thread");}
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error in Posting");
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setContent({
      ...content,
      [name]: value,
    });
  };

  return (
    <>
      <NavbarComponent name={user} />
      <center><h1>Thread Title : {threadName}</h1></center>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <form class="form">
        <h4>Enter your Thread Message here</h4>

        <input
          type="text"
          name="content"
          id="content-thread-text"
          value={content.content}
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
          Send Message
        </Button>
      </form>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      {post.map((postdetails) => {
        console.log(postdetails);
        return <Hppost title="Thread" id_={postdetails.postId} author={postdetails.creatorId} content={postdetails.content} />

      })}
      {/* <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/>
      <Hppost title="Title fetched" author="Amit Kumar" content="this is the content"/>
      <Hppost title="Title fetched" author="Gopal Chaudhary" content="this is the content"/>
      <Hppost title="Title fetched" author="Navnit Anand" content="this is the content"/> */}
    </>
  );
}

export default ThreadView;
