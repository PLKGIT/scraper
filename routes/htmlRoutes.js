// Required
//---------------------------------------
var db = require("../models");

// HTML Routes
//---------------------------------------
module.exports = function (app) {

    // Index
    //---------------------------------------

    app.get("/", function (req, res) {
        res.render("index");
    });

    
    // 404
    //---------------------------------------

    app.get("*", function (req, res) {
        res.render("404");
    });

};