import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function Threadcomponent(props) {
  return (
    <div>
      <Card id="post-card">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.author}</Card.Text>
          <Link to="/post">
          <Button variant="primary">Join Discussion</Button>
          </Link> 
        </Card.Body>
      </Card>
    </div>
  );
}

export default Threadcomponent;
