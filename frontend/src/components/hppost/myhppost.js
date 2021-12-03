import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./hppost.css";
import { Link } from "react-router-dom";
import {
    AiFillDelete
} from 'react-icons/ai';
import axios from "axios"
function Myhppost(props) {
    const deletepost = () => {
        console.log(props.postId);
        axios.delete("/api/post", {
                params: {
                    postId: props.postId
                },
                withCredentials: true
            })
            .then(res => {
                alert("Post  Deleted");
            }).catch(res => alert(res.response.data.message));
        


    }
  let to="/post?"+props
  return (
    <div id="outer-post">
      <Card id="post-card">
        <Card.Header as="h5">{props.author}</Card.Header>
        <Card.Body>
          
          <Card.Text>{props.content}</Card.Text>
          {/* {console.log(props.id_)} */}
          <Link
              to={{
                pathname: "/post",
                search:`?postId=${props.id_}`
              }}>

          <Button id="btn-post" variant="primary">Read More</Button>
          
          </Link>
          < Link to = "/home" >
                <Button variant = "primary" id = "event-btn"
                  onClick = {deletepost} > < AiFillDelete /> </Button> </Link>
        </Card.Body>
      </Card>
      <div>&nbsp;&nbsp;</div>
    </div>
  );
}

export default Myhppost;