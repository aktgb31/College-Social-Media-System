import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./event.css";
function EventComponent(props) {
  var s = new Date(props.time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  return (
    <div id="outer-message">
       <br></br>
      <Card id="event-card">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.author}</Card.Text>
          <Card.Text>{s}</Card.Text>
          {/* <Link to="/post">
          <Button variant="primary">Read More</Button>
          </Link> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default EventComponent;
