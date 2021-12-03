import React from 'react'
import "./navbar.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import { useState } from 'react'
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from "axios"
import PeopleComponent from "../people/people";
import { useHistory } from "react-router-dom";

function Searchprofile() {
    
    const history = useHistory();
    const [post,setPost] = useState([]);
    const [user, setUser] = useState({
        uname: "",
        
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const search = async () => {
      
      const response = await axios.get('/api/user/search', {
      params: {
        keyword: user.uname
      }, 
      withCredentials: true
    
    })
    setPost(response.data.data);
    console.log(response)
    history.push('/search');
        
    }

    
    const [uname, setUname] = useState();
    useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    if (dat.data.userType == "STUDENT"){
      const tr = dat.data.student.firstName + " " + dat.data.student.lastName;
      setUname(tr);
    }
    else {
      const tr = dat.data.club.name;
      setUname(tr);
    }
    
    },[])
    return (
        <>
        <div>
            <NavbarComponent name={uname}/>
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <center><h2>Search Profiles</h2></center>
            <div id="search-box">
            <div class="input-group" id="search-outer">
            <div id="input-outer">
              <input type="text" name="uname" value={user.uname} placeholder="search User by name / emailId" onChange={handleChange} id="form1" class="form-control" />
              <div>&nbsp;&nbsp;&nbsp;</div>
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
<button type="button" id="btn-nav" onClick={search} >
              <FaSearch/>
            </button></div>
            </div>
            <div id="chat-box">
        <div>
          <h2 id="chat-title">&nbsp;Profiles</h2>
          {post && post.map((postdetails) => {
            
            if(!postdetails.name) {
               return<PeopleComponent author={postdetails.firstName+" "+postdetails.lastName} id_={postdetails.userId}/>
             }
            else{
               
               return<PeopleComponent author={postdetails.name} id_={postdetails.userId}/>
             }
          })}
        </div>
      </div>


        
        </div>
        </>
    )
}

export default Searchprofile