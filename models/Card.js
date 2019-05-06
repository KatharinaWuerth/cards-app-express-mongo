const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    get: value => value.toUpperCase()
  },
  description: {
    type: String,
    default: 'No description yet'
  },
  category: {
    type: String,
    set: value => value.toLowerCase()
  },
  tags: [String]
  //order: Number
});

module.exports = mongoose.model('Card', cardSchema); // export geht bei node.js so
