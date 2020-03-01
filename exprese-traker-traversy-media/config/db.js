const mongoose = require("mongoose");

// const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(
      `MONGODB Connected on ${conn.connection.host} `.cyan.underline.bold
    );
  } catch (e) {
    console.log(`Error : ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
