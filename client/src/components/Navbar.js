import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li style={{ width: "54px" }} key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black", marginLeft: "40%" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">
            <i className="large material-icons">person_pin</i>
          </Link>
        </li>,
        <li key="3">
          <Link to="/createpost">
            <i className="large material-icons">create</i>
          </Link>
        </li>,
        <li key="4">
          <Link to="/explore">
            <i className="large material-icons">explore</i>
          </Link>
        </li>,
        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            <i style={{ marginTop: "-50%" }} className="large material-icons ">
              exit_to_app
            </i>
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/login">Login</Link>
        </li>,
        <li key="7">
          <Link to="/register">Register</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" className="modal modaltest " ref={searchModal}>
        <div className="modal-content">
          <i
            className="large material-icons itest modal-close"
            onClick={() => setSearch("")}
          >
            close
          </i>
          <input
            className="inputtest "
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li className="collection-item">{item.email}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
