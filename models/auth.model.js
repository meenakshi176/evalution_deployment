const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const AuthModel = mongoose.model("user", authSchema);

module.exports = {
  AuthModel,
};
