const mongoose = require("mongoose");

const { Schema } = mongoose;

const Task = Schema(
  {
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
      type: Boolean
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", Task);
