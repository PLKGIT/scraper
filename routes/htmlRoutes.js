// Require Express
var express = require("express");

// Require Models
var db = require("../models");

// Require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// HTML Routes
//---------------------------------------
module.exports = function (app) {

    // Index
    //---------------------------------------
    app.get("/", function (req, res) {
        res.render("index");
    });

    // Saved Articles
    //---------------------------------------
    app.get("/saved", function (req, res) {
        res.render("saved");
    });
    
    // 404
    //---------------------------------------
    app.get("*", function (req, res) {
        res.render("404");
    });

};