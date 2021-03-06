import React from "react";
import NavbarComponent from "../navbar/navbar";
import Mythreadcomponent from "./mythreadcomponent";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./thread.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"

function MyThread() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState();
  const [id, setId] = useState();
  useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    if (dat.data.userType == "STUDENT") {
      const tr = dat.data.student.firstName + " " + dat.data.student.lastName;
      setUser(tr);
    }
    else {
      const tr = dat.data.club.name;
      setUser(tr);
    }
    const id = dat.data.userId;

    setId(id)
    console.log({ id });
    const response = await axios.get('/api/thread', {
      params: {
        creatorId: id
      },
      withCredentials: true

    })

    // const data = await response.json();
    // console.log(data);
    setPost(response.data.data);
  }, []);
  return (
    <div>
      <NavbarComponent name={user} />
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div id="thread-box">
        <div>
          <h2 id="thread-title">MY THREADS</h2>
          <div id="full-thread-btn">
            <Link to="/createthread" > <Button variant="primary" id="show-thread-btn" > Create Thread </Button> </Link >
          </div> <div id="full-thread-btn" >
            <Link to="/thread" > <Button variant="primary" id="show-thread-btn" > All Threads </Button> </Link >
          </div>
          <div >&nbsp;</div>

          {/* <Threadcomponent name="CP vs DEV" author="Kunal" />*/}
          {post && post.map((postdetails) => {
            return (
              <Mythreadcomponent
                name={postdetails.threadTitle}
                author={user}
                threadId={postdetails.threadId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyThread;
