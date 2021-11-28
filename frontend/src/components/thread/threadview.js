import React from 'react'
import { Navbar } from 'react-bootstrap'
import NavbarComponent from '../navbar/navbar'
import ThreadMessage from './threadMessage'
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Button from "react-bootstrap/Button";
import "./thread.css";

function ThreadView() {
    return (
        <div>
            <NavbarComponent/>
            <h1 id="thread-name">Thread Name</h1>
            <ThreadMessage author="Utkarsh" content="CP is god"/>
            <ThreadMessage author="Kunal" content="CP is shit"/>
           <form>
                <input type="text" placeholder="Type a message" id="thread-message"/>
                <Button variant="primary">Send</Button>
           </form>
        </div>
    )
}

export default ThreadView
