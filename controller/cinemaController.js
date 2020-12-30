const isEmpty = require("../helper/is-empty");
const Movie = require("../model/movie");
const Ticket = require("../model/ticket");
module.exports = {
  //reserve seat by updating movie data
  updateSeats: async (req, res, next) => {
    try {
      const { seat, price, title } = req.body;
      console.log("req.body", req.body);
      if (isEmpty(seat)) {
        return res.status(406).json({ error: "seat field is required!" });
      }
      const { date, time } = req.params;
      //find a movie by date and time
      //then update the reserved seats
      const movieSchedule = await Movie.findOneAndUpdate(
        {
          date: date,
        },
        { $push: { "times.$[outer].reserved": seat } },
        { arrayFilters: [{ "outer.time": time }], new: true }
      );
      //checking if the schedule exists
      if (isEmpty(movieSchedule)) {
        console.log("item not found");
        return res.status(400).json({ error: "item not found" });
      } else {
        //create a new ticket

        //get attributes
        const ticketContent = {};
        if (price) ticketContent.price = price;
        if (title) ticketContent.title = title;
        ticketContent.seats = seat.length;
        ticketContent.time = time;
        ticketContent.date = date;

        const newTicket = new Ticket(ticketContent);
        await newTicket.save();
        return res.json(newTicket);
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error");
    }
  },
  //gets list of movies with reserved seats
  getScheduleLists: async (req, res, next) => {
    try {
      const movieSchedules = await Movie.find({});

      res.json(movieSchedules);
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error");
    }
  },
  //gets itckets
  getTickets: async (req, res, next) => {
    try {
      const tickets = await Ticket.find({}).sort({ created: -1 });

      res.json(tickets);
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error");
    }
  },
};
