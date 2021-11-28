import React from 'react'
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./thread.css";

function ThreadMessage(props) {
    return (
        <div id="thread-msg-card">
        <Card id="message">
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Card.Text>{props.content}</Card.Text>
          {/* <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link> */}
        </Card.Body>
      </Card>
        </div>
    )
}

export default ThreadMessage
