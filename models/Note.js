// Note Model

var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Note Schema
var NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Mongoose Model
var Note = mongoose.model("Note", NoteSchema);

// Export Note model
module.exports = Note;