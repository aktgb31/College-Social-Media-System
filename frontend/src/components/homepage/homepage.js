import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const Homepage = ({ setLoginUser }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">College Social Media System</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as : <a href="#login">Mark Otto </a>
            </Navbar.Text>
            <Navbar.Text>&nbsp;</Navbar.Text>
            <Navbar.Text>
              Logout: <Link to="/logout">logout</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
