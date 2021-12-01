import React from "react";
import { useState } from "react";
import NavbarComponent from "../navbar/navbar";
import "./thread.css";
import axios from "axios"
import { useHistory } from "react-router-dom"

function Createthread() {
    const history = useHistory()
    const [user, setUser] = useState({
        threadTitle: "",
        // threadAuthor: ""
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(user);
        setUser({
          ...user,
          [name]: value,
        });
      };
      const register = () => {
        
        console.log(user);
        axios.post("/api/thread", user, { withCredentials: true })
            .then(res => {

                alert("Response Saved");
                history.push("/mythread");
            }).catch(res => alert(res.response.data.message));
        
        
    }
  return (
    <div>
      < NavbarComponent />
      <div className="login" >
        <div className="form" >
          <h2>Create Thread Here</h2>
          <input
            type="text"
            name="threadTitle"
            value={user.threadTitle}
            placeholder="Thread Name"
            onChange={handleChange}
          ></input>
          
          <div className="button" id="thread-btn" onClick={register}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createthread;
