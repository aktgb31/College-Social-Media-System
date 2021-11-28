import React from 'react'
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function ThreadMessage(props) {
    return (
        <div>
        <Card id="post-card">
        <Card.Header as="h5">Author - {props.author}</Card.Header>
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
