const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const loadSeed = require("./service/seed");

//app setup

connectDB(); //mongo db connection
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//loading seed
if (loadSeed()) console.log("seed loaded");
else console.log("error loading seed");

app.use(cors());

app.get("/", (req, res) => {
  res.json("Please reffer to the API documentation to get access to endpoints");
});

//Routes
app.use("/movie/", require("./routes/cinemaRoutes"));

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server listening at " + port);
