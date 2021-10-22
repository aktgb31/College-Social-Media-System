import React from "react"
import "./homepage.css"
import {Link} from "react-router-dom"
const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <h1>welcome to nitc social media app</h1>
            <Link to="/logout">Logout</Link>
        </div>
    )
}

export default Homepage