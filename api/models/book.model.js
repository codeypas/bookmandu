const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  reviews: [reviewSchema], // NEW
});

module.exports = mongoose.model("Book", bookSchema);
