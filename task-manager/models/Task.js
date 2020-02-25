const mongoose = require("mongoose");

const { Schema } = mongoose;

const Task = Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value === "") {
        throw new Error("You Must Enter Something");
      }
    }
  },
  completed: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Task", Task);
