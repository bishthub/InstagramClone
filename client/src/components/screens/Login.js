import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";
import M from "materialize-css";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      var toastHTML =
        ' <i class="small material-icons">cancel </i> <span>&nbsp;&nbsp;Invalid Email</span>';
      M.toast({
        html: toastHTML,
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          var toastHTML =
            ' <i class="small material-icons">notifications_active </i> <span>&nbsp;&nbsp;Logged In Successfully</span>';
          M.toast({
            html: toastHTML,
            classes: "#43a047 green darken-1 ",
          });
          history.push("/explore");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-5 mx-auto">
          <div id="first">
            <div class="myform form ">
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="form-group">
                <p class="text-center">
                  Forgot Password? <Link to="/reset">Reset</Link>
                </p>
                <p class="text-center">
                  By signing up you accept our
                  <span className="onhover">
                    {" "}
                    Terms Of Use
                    <span className="tooltiptext">Dont spam accounts</span>
                  </span>
                </p>
              </div>
              <div class="col-md-12 text-center ">
                <button
                  type="submit"
                  class=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={() => PostData()}
                >
                  Login
                </button>
              </div>
              <div class="col-md-12 ">
                <div class="login-or">
                  <hr class="hr-or" />
                  <span class="span-or">or</span>
                </div>
              </div>
              <div class="form-group">
                <p class="text-center">
                  Don't have account?{" "}
                  <Link to="/register" id="signup">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
