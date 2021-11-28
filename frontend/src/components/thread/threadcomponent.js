import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./thread.css";

function Threadcomponent(props) {
  return (
    <div id="outer-message">
      <br></br>
      <Card id="thread-card">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.author}</Card.Text>
          <Link to="/threadview">
          <Button variant="primary" id="thread-btn">Join Discussion</Button>
          </Link> 
        </Card.Body>
      </Card>
    </div>
  );
}

export default Threadcomponent;
