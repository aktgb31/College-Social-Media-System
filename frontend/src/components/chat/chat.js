import React from 'react'
import NavbarComponent from '../navbar/navbar'

import PeopleComponent from '../people/people';
import "../people/people.css";

function chat() {
   
    return (
        <>
            <NavbarComponent />
            <div>&nbsp;&nbsp;</div><div>&nbsp;&nbsp;</div>
            <div id="chat-box">
            <div>
            <h2 id="chat-title">&nbsp;CHAT</h2>
            <PeopleComponent author="Navnit Anand"/>
            <PeopleComponent author="Amit Kumar"/>
            <PeopleComponent author="Gopal"/>
            
            
        </div></div></>
    )
}

export default chat
//indonesia-idr
//bulgaria -bgn
