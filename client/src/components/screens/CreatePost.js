import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setImgurl] = useState("");
  useEffect(()=>{
    if(url){
    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          
          M.toast({
            html: "Post Created successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[url])
  const postDetails = () => {
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
        setImgurl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <div className="custom-file mb-3">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          name="filename"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label className="custom-file-label" for="customFile">
          Choose file
        </label>
      </div>
      <div className="col-md-6 text-center " style={{ marginLeft: "22%" }}>
        <button
          type="submit"
          className="btn btn-block mybtn btn-primary tx-tfm"
          onClick={() => postDetails()}
        >
          SUBMIT POST
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
