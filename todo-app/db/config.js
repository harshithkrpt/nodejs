const mongoose = require("mongoose");

// const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todo-app", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MONGODB Connected on ${conn.connection.host} `);
  } catch (e) {
    console.log(`Error : ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
