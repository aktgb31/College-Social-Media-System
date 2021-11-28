import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiFillDelete } from 'react-icons/ai';
function MyEventComponent(props) {
  return (
    <div id="outer-message">
       <br></br>
      <Card id="event-card">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.author}</Card.Text>
          <Card.Text>{props.time}</Card.Text>
          {/* <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link> */}
          <Link to="/myevents">
          <Button variant="primary" id="event-btn"><AiFillDelete/></Button>
          </Link>
        </Card.Body>
      </Card>
    </div>






 
  );
}
export default MyEventComponent;