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
  const senderId = new URLSearchParams(search).get("senderId");
  const [user, setUser] = useState({
    message: "",
  });
  useEffect(async () => {
    {
      console.log("this is sender id", senderId);
    }
    const response = await fetch(`/api/message/?userId=${senderId}`);
    const dat = await response.json();
    //console.log(dat.data);
    setPost(dat.data);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const sendMessage = () => {
    console.log(user.message, senderId);
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <NavbarComponent />

      {/* <MessageComponent
        author="Gopal"
        content="this is sample content for messages"
      /> */}
      {post.map((postdetails) => {
        return (
          <MessageComponent
            author={postdetails.senderId}
            content={postdetails.hashedContent}
          />
        );
      })}

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
    </div>
  );
}

export default Message;
