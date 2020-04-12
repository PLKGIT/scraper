// Note Model

var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Note Schema
var NoteSchema = new Schema({
  date: String,
  title: String,
  body: String
});

// Mongoose Model
var Note = mongoose.model("Note", NoteSchema);

// Export Note model
module.exports = Note;