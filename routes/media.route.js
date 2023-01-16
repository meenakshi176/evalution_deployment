const express = require("express");
const { MediaModel } = require("../models/media.model");
const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res) => {
  const media_data = await MediaModel.find();
  res.send(media_data);
});

mediaRouter.post("/posts", async (req, res) => {
  const payload = req.body;
  try {
    const data = new MediaModel(payload);
    await data.save();
    res.send({ msg: "Media Data Added Successfully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});

mediaRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;
  const note = await MediaModel.findOne({ _id: ID });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send({ msg: "Data Updated Sucessfully" });
    }
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});
mediaRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const note = await MediaModel.findOne({ _id: ID });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await MediaModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: "Data Deleted Sucessfully" });
    }
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  mediaRouter,
};
