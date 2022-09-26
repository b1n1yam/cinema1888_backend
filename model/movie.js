const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const movieSchama = new Schema({
  date: {
    type: String,
  },
  times: [
    {
      time: { type: String },
      reserved: [String],
      availability: { type: String, default: "available" },
    },
  ],
});

//model create
const movieModel = mongoose.model("movie", movieSchama);

//export model
module.exports = movieModel;
