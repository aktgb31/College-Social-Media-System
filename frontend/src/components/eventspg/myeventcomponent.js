import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function MyEventComponent(props) {
  return (
    <div>
      <Link to="/eventcreate"><Button variant="primary">Create Event</Button></Link>
      <Link to="/myevents"><Button variant="primary">My Events</Button></Link>
      <Card id="post-card">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.author}</Card.Text>
          <Card.Text>{props.time}</Card.Text>
          <Link to="/post">
          <Button variant="primary">Delete</Button>
          </Link> 
        </Card.Body>
      </Card>
    </div>
  );
}
export default MyEventComponent;