// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");



// Initialize Express
var app = express();

// Middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true }).then(
//   () => { console.log("Ready!") },
//   err => { console.log("There was a connection error") }
// );


// API Routes
//---------------------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});