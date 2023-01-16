const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { AuthModel } = require("../models/auth.model");
const authRouter = express.Router();

authRouter.get("/", async (req, res) => {
  const data = await AuthModel.find();
  res.send(data);
});
authRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  //  console.log(payload);
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new AuthModel({
          name,
          email,
          gender,
          password: secure_password,
        });
        await user.save();
        res.send({ msg: "Registered" });
      }
    });
  } catch (e) {
    res.send({ msg: "Error in registering the user" });
    console.log(e);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.find({ email });
    // console.log(user);
    const password_from_client = password;
    const password_from_db = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(password_from_client, password_from_db, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Logged in Successfull", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (e) {
    res.send({ msg: "Logged In Failed" });
    console.log(e);
  }
});

module.exports = {
  authRouter,
};
