const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TicketSchama = new Schema({
  title: { type: String },
  price: { type: String },
  seats: { type: String },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now, //auto fill the current date
  },
});

//model create
const ticketModel = mongoose.model("ticket", TicketSchama);

//export model
module.exports = ticketModel;
