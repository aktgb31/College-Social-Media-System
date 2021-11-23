import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../navbar/navbar";
const Homepage = ({ setLoginUser }) => {
  return (
    <>
     <NavbarComponent/>
      <div>
        <h1>welcome to nitc social media app</h1>
      </div>
      <Card>
        <Card.Header as="h5">Name of the Author</Card.Header>
        <Card.Body>
          <Card.Title>Title of the post</Card.Title>
          <Card.Text>
           text component of the post
          </Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Homepage;
