import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function PeopleComponent(props) {
  return (
    <div>
      <Card>
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Link to="/message">
          <Button variant="primary">Chat</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PeopleComponent;
