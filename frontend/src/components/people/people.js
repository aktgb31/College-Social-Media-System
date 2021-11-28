import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./people.css";
function PeopleComponent(props) {
  return (
    
    
    <div id="outer-message">
      <Card id="chat-card">
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Link to="/message">
          <Button variant="primary" id="btn-chat">Chat</Button>
          </Link>
        </Card.Body>
      </Card>
      
    </div>
  );
}

export default PeopleComponent;
