import React from 'react'
import NavbarComponent from '../navbar/navbar'
import MessageComponent from '../messagecomponent.js/messagecomponent'
function Message() {
    return (
        <div>
            <NavbarComponent/>
            <MessageComponent author="Gopal" content="this is sample content for messages"/>
        </div>
    )
}

export default Message
