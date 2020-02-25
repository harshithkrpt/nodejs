const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("User", User);
