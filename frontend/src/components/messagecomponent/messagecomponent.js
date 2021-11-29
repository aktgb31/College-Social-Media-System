import React from 'react'
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./messagecomponent.css";

function MessageComponent(props) {
    return (
      <>
        <div>&nbsp;&nbsp;</div>
        <div id="message-outer">
        <Card id="message-card">
        <Card.Header as="h5" id="author-box">{props.author}</Card.Header>
        <Card.Body>
          <Card.Text>{props.content}</Card.Text>
          {/* <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link> */}
        </Card.Body>
      </Card>
        </div></>
    )
}

export default MessageComponent
