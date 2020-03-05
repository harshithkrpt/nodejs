const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email
      });
      if (existingUser) {
        throw new Error("User Exists Already");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (e) {
      throw new Error(e);
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credientials 1");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Invalid Credientials 2");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "THISISPRIVATEKEY",
      { expiresIn: "1h" }
    );
    return { userId: user.id, token, tokenExpiration: 1 };
  }
};
