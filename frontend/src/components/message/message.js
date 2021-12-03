import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import MessageComponent from "../messagecomponent/messagecomponent";
import Button from "react-bootstrap/Button";
import "../messagecomponent/messagecomponent.css";
import { useEffect } from "react";
import axios from "axios";
function Message() {
  const search = useLocation().search;
  const [post, setPost] = useState([]);
  const [name,setName] = useState(null);
  const senderId = new URLSearchParams(search).get("senderId");
  const [count, setCount] = useState(0);
  const [friend,setFriend] = useState(null);
  const [user, setUser] = useState({
    message: "",
  });
  useEffect(async () => {
    const res= await fetch("/api/user/profile/me");
    const datap= await res.json();
    try {
       const tr=datap.data.student.firstName;
       setName(tr);
    }
  catch(err) {
    const tr=datap.data.club.name;
    setName(tr);
  }
  const res1= await fetch(`/api/user/profile/?userId=${senderId}`);
    const datap1= await res1.json();
    try {
       const tr=datap1.data.student.firstName;
       setFriend(tr);
    }
  catch(err) {
    const tr=datap1.data.club.name;
    setFriend(tr);
  }
    // {
    //   console.log("this is sender id", senderId);
      
    // }
    const response = await fetch(`/api/message/?userId=${senderId}`);
    const dat = await response.json();
    //console.log(dat.data);
    setPost(dat.data);

  }, [count]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const sendMessage = () => {
    // console.log(user.message, senderId);
    const data = {
      receiverId: senderId,
      content: user.message,
    };
    fetch("/api/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Message sent");
        setCount(count + 1);
        setUser({message: ""});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      {console.log(friend)}
      <NavbarComponent name={name}/>
      <div>&nbsp;</div>
      <form id="input-form">
        <input
          type="text"
          placeholder="Type a message"
          name="message"
          value={user.message}
          id="thread-message"
          onChange={handleChange}
        />
        <Button variant="primary" onClick={sendMessage} id="send-btn">
          Send
        </Button>
      </form>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      {/* <MessageComponent
        author="Gopal"
        content="this is sample content for messages"
      /> */}
      {post && post.map((postdetails) => {
        return (
          <MessageComponent
            author={postdetails.senderId==senderId?friend:name}
            content={postdetails.hashedContent}
          />
        );
      })}

      
    </div>
  );
}

export default Message;
