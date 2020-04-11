var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Articles Schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  link: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;