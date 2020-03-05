const Event = require("../../models/Event");
const User = require("../../models/User");

const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not Authenticated");
    }
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId
      });
      const result = await event.save();
      const fetchedUser = await User.findById(req.userId);
      if (!fetchedUser) {
        throw new Error("User Not Found");
      }
      fetchedUser.createdEvents.push(event);
      await fetchedUser.save();
      return transformEvent(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
