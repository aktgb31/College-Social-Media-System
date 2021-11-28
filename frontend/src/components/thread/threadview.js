import { Button } from 'bootstrap'
import React from 'react'
import { Navbar } from 'react-bootstrap'
import NavbarComponent from '../navbar/navbar'
import ThreadMessage from './threadMessage'
import "./thread.css";

function ThreadView() {
    return (
        <div>
            <NavbarComponent/>
            <h1 id="thread-name">Thread Name</h1>
            <ThreadMessage author="Utkarsh" content="CP is god"/>
            <ThreadMessage author="Kunal" content="CP is shit"/>
        </div>
    )
}

export default ThreadView
