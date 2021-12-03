import React from "react";
import {
    Card
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
    Link
} from "react-router-dom";
import "./thread.css";
import {
    AiFillDelete
} from 'react-icons/ai';
import axios from "axios"

function Mythreadcomponent(props) {
    const deletethread = () => {
        // console.log(props.eventId);
        axios.delete("/api/thread", {
            params: {
                threadId: props.threadId
            },
            withCredentials: true
        })
            .then(res => {
                alert("Thread Deleted");
            }).catch(res => alert(res.response.data.message));


    }
    return (
        <div id="outer-message" >
            <br></br>
            <Card id="thread-card" >
                <Card.Header as="h5" > {
                    props.name
                } </Card.Header> <Card.Body >
                    <Card.Text > {
                        props.author
                    } </Card.Text>
                    <Link to={{
                        pathname: "/threadview",
                        search: `?threadId=${props.threadId}`,
                    }} >
                        <Button variant="primary" id="thread-btn" > Join Discussion </Button>
                    </Link>
                    < Link to="/thread" >
                        <Button variant="primary" id="event-btn"
                            onClick={deletethread} > < AiFillDelete /> </Button> </Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Mythreadcomponent;
