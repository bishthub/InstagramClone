import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import M from "materialize-css";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "InstaClone");
    data.append("cloud_name", "bishtji");
    fetch("https://api.cloudinary.com/v1_1/bishtji/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      var toastHTML =
        ' <i class="small material-icons">cancel </i> <span>&nbsp;&nbsp;Invalid Email</span>';
      M.toast({ html: toastHTML, classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Signup</h1>
                </div>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="firstname"
                  aria-describedby="emailHelp"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="custom-file mb-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    name="filename"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label className="custom-file-label" for="customFile">
                    Upload Profile Image
                  </label>
                </div>
              </div>
              <div className="col-md-12 text-center mb-3">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={() => PostData()}
                >
                  Get Started For Free
                </button>
              </div>
              <div className="col-md-12 ">
                <div className="form-group">
                  <p className="text-center">
                    <Link to="/login" id="signin">
                      Already have an account?
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
