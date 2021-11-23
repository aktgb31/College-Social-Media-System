import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
function Hppost(props) {
  return (
    <div>
      <Card>
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.content}</Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Hppost;
