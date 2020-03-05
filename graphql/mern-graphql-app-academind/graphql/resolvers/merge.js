const Event = require("../../models/Event");
const User = require("../../models/User");
const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const fetchedEvents = await Event.find({ _id: { $in: eventIds } });
    return fetchedEvents.map(event => {
      return transformEvent(event);
    });
  } catch (error) {
    throw new Error(error);
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
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

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
