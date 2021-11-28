import React from 'react'
import NavbarComponent from '../navbar/navbar'
import MessageComponent from '../messagecomponent.js/messagecomponent'
import Button from "react-bootstrap/Button";
function Message() {
    return (
        <div>
            <NavbarComponent/>
            <MessageComponent author="Gopal" content="this is sample content for messages"/>
            <form>
                <input type="text" placeholder="Type a message" id="thread-message"/>
                <Button variant="primary">Send</Button>
           </form>
        </div>
    )
}

export default Message
