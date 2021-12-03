import React from "react";
import NavbarComponent from "../navbar/navbar";
import { useEffect } from "react";
import { useState } from "react";
import PeopleComponent from "../people/people";
import "../people/people.css";

function Chat() {
  const [post, setPost] = useState([]);
  const [user,setUser] = useState(null);
  useEffect(async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    console.log(data);
    setPost(data.data);

    const res= await fetch("/api/user/profile/me");
    const dat= await res.json();
    if (dat.data.userType == "STUDENT"){
      const tr = dat.data.student.firstName + " " + dat.data.student.lastName;
      setUser(tr);
    }
    else {
      const tr = dat.data.club.name;
      setUser(tr);
    }
  }, []);
  return (
    <>
      <NavbarComponent name={user} />
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;</div>
      <div id="chat-box">
        <div>
          <h2 id="chat-title">&nbsp;CHAT</h2>
          {post && post.map((postdetails) => {
            const username=   postdetails.emailId.split("_")
             if(username.length==1){
               const authorname=postdetails.emailId.split("@")[0].toUpperCase();
               return<PeopleComponent author={authorname} id_={postdetails.userId}/>
             }
             else{
               const authorname=username[0].toUpperCase();
               return<PeopleComponent author={authorname} id_={postdetails.userId}/>
             }
          })}
        </div>
      </div>
    </>
  );
}

export default Chat;
//indonesia-idr
//bulgaria -bgn
