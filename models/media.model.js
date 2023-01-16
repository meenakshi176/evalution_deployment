const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);
const MediaModel = mongoose.model("media_data", mediaSchema);

module.exports = {
  MediaModel,
};
