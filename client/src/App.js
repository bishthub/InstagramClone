import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from "./components/screens/Profile";
import Reset from "./components/screens/Reset";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";
import NewPassword from "./components/screens/Newpassword";
import SubscribedUserPost from "./components/screens/SubscribedUserPosts";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <SubscribedUserPost />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/explore">
        <Home />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
