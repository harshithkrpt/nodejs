const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
