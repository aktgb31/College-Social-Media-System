import './App.css';
import Homepage from './components/homepage/homepage'
import Login from "./components/login/login"
import Forgot from "./components/forgot/forgot"
import Registerst from "./components/registerst/registerst"
import Registercl from "./components/registercl/registercl"
import Logout from "./components/logout/logout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
function App() {
  const [ user, setLoginUser] = useState({ 
    // firstName: "",
    // id:"1",
    // lastName: "",
    // emailId: "",
    // branch: "",
    // passingYear: "",
    // dob: "",
    // gender: "", 
})
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user.id ?(<Homepage setLoginUser={setLoginUser} />):(<Login setLoginUser={setLoginUser}/>)
            }
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
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
