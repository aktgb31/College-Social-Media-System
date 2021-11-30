  import './App.css';
import Homepage from './components/homepage/homepage'
import Login from "./components/login/login"
import Forgot from "./components/forgot/forgot"
import Registerst from "./components/registerst/registerst"
import Registercl from "./components/registercl/registercl"
import Logout from "./components/logout/logout"
import Post from './components/post/post'
import Chat from './components/chat/chat'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import User from './components/user/user'
import CreatePost from './components/createpost/createpost';
import Message from './components/message/message';
import Eventspg from './components/eventspg/eventspg';
import Eventcreate from './components/eventspg/eventcreate';
import Myevents from './components/eventspg/myevents';
import Thread from './components/thread/thread';
import Createthread from './components/thread/createthread';
import ThreadView from './components/thread/threadview';
function App() {
  const [ user, setLoginUser] = useState({ 
    firstName: "",
    id:"1",
    lastName: "",
    emailId: "",
    branch: "",
    passingYear: "",
    dob: "",
    gender: "", 
})
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route  path="/home">
            <Homepage/>
          </Route>
          <Route  path="/createpost">
            <CreatePost/>
          </Route>
          <Route  path="/event">
            <Eventspg/>
          </Route>
          <Route  path="/eventcreate">
            <Eventcreate/>
          </Route>
          <Route  path="/myevents">
            <Myevents/>
          </Route>
          <Route  path="/thread">
            <Thread/>
          </Route>
          <Route  path="/createthread">
            <Createthread/>
          </Route>
          <Route  path="/threadview">
            <ThreadView/>
          </Route>
          <Route  path="/message">
            <Message/>
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/registerst">
            <Registerst />
          </Route>
          <Route path="/registercl">
            <Registercl />
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/user">
            <User />
            </Route>
          < Route path="/post" >
            <Post/>
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/chat">
            <Chat />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
