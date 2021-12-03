import React from 'react'
import "./navbar.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import { useState } from 'react'
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function Searchprofile() {
    
    

    const [user, setUser] = useState({
        name: "",
        
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    // const register = () => {
    //     const response = await axios.get('/api/search', {
    //   params: {
    //     name: {name}
    //   }, 
    //   withCredentials: true
    
    // })
        
    // }

    
    const [uname, setUname] = useState();
    useEffect(async () => {
    const res = await fetch("/api/user/profile/me");
    const dat = await res.json();
    try {
       const tr=dat.data.student.firstName;
       setUname(tr);
    }
  catch(err) {
    const tr=dat.data.club.name;
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
              <input type="text" name="name" value={user.name} placeholder="search User by name" onChange={handleChange} id="form1" class="form-control" />
              <label class="form-label" for="form1">Search</label>
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
<button type="button" id="btn-nav"  >
              <FaSearch/>
            </button></div>
            </div>


        
        </div></>
    )
}

export default Searchprofile