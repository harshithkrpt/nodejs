const bcrypt = require("bcryptjs");

// Models
const Event = require("../../models/Event");
const User = require("../../models/User");
const Booking = require("../../models/Booking");

const events = async eventIds => {
  try {
    const fetchedEvents = await Event.find({ _id: { $in: eventIds } });
    return fetchedEvents.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator)
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event._doc.creator)
    };
  } catch (error) {
    throw error;
  }
};

const user = async userId => {
  try {
    const fetchedUser = await User.findById(userId);

    return {
      ...fetchedUser._doc,
      _id: fetchedUser.id,
      password: null,
      createdEvents: events.bind(this, fetchedUser._doc.createdEvents)
    };
  } catch (e) {
    throw new Error(error);
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event)
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  createEvent: async args => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5e5e60533ca2b425035e3327"
      });
      const result = await event.save();
      // TODO TO Be Changed In The Future
      const fetchedUser = await User.findById("5e5e60533ca2b425035e3327");
      if (!fetchedUser) {
        throw new Error("User Not Found");
      }
      fetchedUser.createdEvents.push(event);
      const updatedUser = await fetchedUser.save();
      return {
        ...result._doc,
        _id: result.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
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
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5e5e60533ca2b425035e3327",
      event: fetchedEvent
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString(),
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event)
    };
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator)
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw err;
    }
  }
};
