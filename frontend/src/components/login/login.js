import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        emailId: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("/api/user/login", user, { withCredentials: true })
            .then(res => {
                history.push("/home");
            }).catch(res => alert(res.response.data.message));
        console.log(user);
    }

    return (

        <div className="login">

            <div className="form">
                <center><h2>LOGIN</h2></center>

                <input type="text" name="emailId" value={user.emailId} onChange={handleChange} placeholder="Enter your Email ID"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                <div className="button" onClick={login} >Login</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/registerst")}>Register as Student</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/registercl")}>Register as Club</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/forgot")}>Forgot Password</div>
            </div>
        </div>
    )
}

export default Login