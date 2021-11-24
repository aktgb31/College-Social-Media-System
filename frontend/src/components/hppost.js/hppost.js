import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function Hppost(props) {
  return (
    <div>
      <Card>
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.content}</Card.Text>
          <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Hppost;
