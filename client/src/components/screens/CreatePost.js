import React from "react";

const CreatePost = () => {
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
      <input type="text" placeholder="text"></input>
      <input type="text" placeholder="body"></input>
      <div class="custom-file mb-3">
        <input
          type="file"
          class="custom-file-input"
          id="customFile"
          name="filename"
        />
        <label class="custom-file-label" for="customFile">
          Choose file
        </label>
      </div>
      <div class="col-md-6 text-center " style={{ marginLeft: "22%" }}>
        <button type="submit" class="btn btn-block mybtn btn-primary tx-tfm">
          SUBMIT POST
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
