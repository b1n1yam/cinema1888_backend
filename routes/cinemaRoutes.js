const express = require("express");
const router = require("express-promise-router")();

const {
  getScheduleLists,
  updateSeats,
  getTickets,
} = require("../controller/cinemaController");

//@route GET /movie
//@desc  get a list of movie schedules
//@access public
router.route("/").get(getScheduleLists);

//@route PUT /movie/reserve/:date/:time
//@desc  updaes movie schedule by filtering with date and time
//@access public
router.route("/reserve/:date/:time").put(updateSeats);

//@route GET /movie/tickets
//@desc  list all tickets of users
//@access public
router.route("/ticket").put(getTickets);

module.exports = router;
