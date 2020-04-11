// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true }).then(
  () => { console.log("Ready!") },
  err => { console.log("There was a connection error") }
);


// API Routes
//---------------------------------------
require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});