// Require Express
var express = require("express");

// Require Models
var db = require("../models");

// Require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

    // A GET route for scraping the USA Today website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.reuters.com/news/world")
            .then(function (response) {
                // Then, we load that into cheerio and save it to $ for a shorthand selector
                var $ = cheerio.load(response.data);
                $(".FeedItem_item").each(function (i, element) {
                    // Save an empty result object
                    var result = {};

                    // Add the text and href of every link, and save them as properties of the result object

                    result.title = $(this)
                        .find("h2 a")
                        .text().trim();
                    result.link = $(this)
                        .find("h2 a")
                        .attr("href");
                    result.summary = $(this)
                        .find(".FeedItemLede_lede")
                        .text().trim();
                    result.image = $(this)
                        .find("span a img")
                        .attr("src");
                    // Create a new Article using the `result` object built from scraping

                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                });

                // Send a message to the client
                res.send("Scrape Successful!");
            }).catch(function (err) {
                // If an error occurred, send it to the client

                res.json(err);
            });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // Grab every unsaved document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for saving articles
    app.post("/articlessav/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.updateOne({ _id: req.params.id }, { $set: { "saved": "1" } })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for deleting a single article
    app.get("/articlesdel/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.deleteOne({ _id: req.params.id })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for deleting all unsaved article
    app.get("/articlesdel", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.deleteMany({ "saved": "0" })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for saving articles
    app.post("/notesav/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        console.log(req.body)
        db.Note.update({ _id: req.body.id }, 
            { $set: {title: req.body.title, body: req.body.body } })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for deleting a single article
    app.get("/notedel/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Note.deleteOne({ _id: req.params.id })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

};