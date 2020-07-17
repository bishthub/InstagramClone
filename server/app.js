const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./key");

require("./models/user");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});
mongoose.connection.on("error", (err) => {
  console.log("error in connection", err);
});

mongoose.model("User");

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
