import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
