const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/bishtji/image/upload/v1595133940/instagram-default-profile-picture-11562973083brycehrmyv_gurcuq.png",
  },
  resetToken: String,
  expireToken: Date,
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
