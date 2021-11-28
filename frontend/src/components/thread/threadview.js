import React from "react";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import ThreadMessage from "./threadMessage";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Button from "react-bootstrap/Button";
import "./thread.css";

function ThreadView() {
  const [user, setUser] = useState({
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const sendMessage = () => {
    console.log(user);
  };
  return (
    <div>
      <NavbarComponent />
      <h1 id="thread-name">Thread Name</h1>
      <ThreadMessage author="Utkarsh" content="CP is god" />
      <ThreadMessage author="Kunal" content="CP is shit" />
      <form>
        <input
          type="text"
          placeholder="Type a message"
          id="thread-message"
          name="message"
          value={user.message}
          onChange={handleChange}
        />
        <Button variant="primary" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default ThreadView;
