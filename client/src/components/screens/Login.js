import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Login = () => {
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
              <form action="" method="post" name="login">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
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
                  />
                </div>
                <div class="form-group">
                  <p class="text-center">
                    By signing up you accept our{" "}
                    <Link to="/">Terms Of Use</Link>
                  </p>
                </div>
                <div class="col-md-12 text-center ">
                  <button
                    type="submit"
                    class=" btn btn-block mybtn btn-primary tx-tfm"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
