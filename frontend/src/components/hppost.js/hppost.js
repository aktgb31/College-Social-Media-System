import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./hppost.css";
import { Link } from "react-router-dom";
function Hppost(props) {
  return (
    <div id="outer-post">
      <Card id="post-card">
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.content}</Card.Text>
          <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link>
        </Card.Body>
      </Card>
      <div>&nbsp;&nbsp;</div>
    </div>
  );
}

export default Hppost;
