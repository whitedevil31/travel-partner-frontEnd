import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Route/Login";
import SignUp from "./Route/SignUp";
import DashBoard from "./Route/DashBoard";
import CreatePost from "./Route/CreatePost";
import PostId from "./Route/PostId";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/users">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/post">
          <CreatePost />
        </Route>
        <Route path="/postId">
          <PostId />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

// const [data, setData] = useState([]);
// fetch("https://travel-partner-backend.herokuapp.com/users/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(DATA),
// }).then((response) => {
//   response.json().then((res) => {
//     setData(res.user);
//   });
// });

// <div className="App">
//   <input placeholder="name" />
//   <input placeholder="email" />
//   <input placeholder="age" />
// </div>

// const DATA = {
//   email: "su122a22221@gmail.com",
//   password: "suradbdfdd",
// };
