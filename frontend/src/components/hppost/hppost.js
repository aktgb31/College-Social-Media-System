import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./hppost.css";
import { Link } from "react-router-dom";
function Hppost(props) {
  let to="/post?"+props
  return (
    <div id="outer-post">
      <Card id="post-card">
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.content}</Card.Text>
          {/* {console.log(props.id_)} */}
          <Link
              to={{
                pathname: "/post",
                search:`?postId=${props.id_}`
              }}>

          <Button id="btn-post" variant="primary">Read More</Button>
          
          </Link>
        </Card.Body>
      </Card>
      <div>&nbsp;&nbsp;</div>
    </div>
  );
}

export default Hppost;
