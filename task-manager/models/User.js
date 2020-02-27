const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Task = require("./Task");

const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

// Virtual Property
User.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

User.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

User.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign(
    { _id: user.id.toString() },
    process.env.JSON_WEB_TOKEN
  );

  // Store in Tokens Database
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

User.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Unable to Login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to Login");
  }

  return user;
};

// hash the password before u save
// Here Do not use Arrow Function -> this context
User.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// DELETE USER TASKS WHEN USER IS DELETED
User.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

module.exports = mongoose.model("User", User);
