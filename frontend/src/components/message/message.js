import React, { useState } from "react";
import NavbarComponent from "../navbar/navbar";
import MessageComponent from "../messagecomponent/messagecomponent";
import Button from "react-bootstrap/Button";
import "../messagecomponent/messagecomponent.css";

function Message() {
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
      
      <MessageComponent
        author="Gopal"
        content="this is sample content for messages"
      />
      <MessageComponent
        author="Gopal"
        content="this is sample content for messages"
      />
  
      
      <form id="input-form">
        <input
          type="text"
          placeholder="Type a message"
          name="message"
          value={user.message}
          id="thread-message"
          onChange={handleChange}
        />
        <Button variant="primary" onClick={sendMessage} id="send-btn">Send</Button>
      </form>
    </div>
  );
}

export default Message;
