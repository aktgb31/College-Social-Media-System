import React from 'react'
import NavbarComponent from '../navbar/navbar'
import EventComponent from './eventscmp'
import MyEventComponent from './myeventcomponent'
import Button from "react-bootstrap/Button";
import {
    Link
} from "react-router-dom";
import {
    useState
} from "react";
import {
    useEffect
} from "react";
import axios from "axios"

function Myevents() {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState();
    const [id, setId] = useState();
    useEffect(async () => {
        const res = await fetch("/api/user/profile/me");
        const dat = await res.json();
        const tr = dat.data.student.firstName;
        const id = dat.data.userId;
        setUser(tr);
        setId(id)
        console.log({
            id
        });
        const response = await axios.get('/api/event', {
            params: {
                creatorId: id
            },
            withCredentials: true

        })
        // console.log(response.data.data)
        // const data = await response.json();
        // console.log(data);
        setPost(response.data.data);
    }, []);
    return ( <
        div >
        <
        NavbarComponent name = {
            user
        }
        /> <
        div > & nbsp; & nbsp; < /div><div>&nbsp;&nbsp;</div >
        <
        div id = "event-box" >
        <
        div >
        <
        h2 id = "event-title" > My Events < /h2> <
        div id = "full-event-btn" >
        <
        Link to = "/eventcreate" > < Button variant = "primary"
        id = "event-btn" > Create Event < /Button></Link > < /div> <
        div id = "full-event-btn" >
        <
        Link to = "/event" > < Button variant = "primary"
        id = "event-btn" > All Events < /Button></Link > < /div> <
        br > < /br> {
            post.map((postdetails) => {
                return ( <
                    MyEventComponent name = {
                        postdetails.eventName
                    }
                    time = {
                        postdetails.eventTime
                    }
                    author = {
                        user
                    }
                    />
                );
            })
        }

        <
        /div></div > < /div>
    )
}

export default Myevents