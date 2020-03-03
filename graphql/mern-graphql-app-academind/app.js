const express = require("express");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const Event = require("./models/Event");
const User = require("./models/User");

const app = express();

const events = [];

app.use(express.json());

app.use(
  "/graphql",
  graphqlHttp({
    //   This is a Schema
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }


        type User {
          _id: ID!
          email: String!
          password: String
        }


        input UserInput {
          email: String!
          password: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // This is a Resolver
    rootValue: {
      events: async () => {
        try {
          const events = await Event.find();
          return events.map(event => {
            return { ...event._doc, _id: event._doc._id.toString() };
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
          const user = await User.findById("5e5e60533ca2b425035e3327");
          if (!user) {
            throw new Error("User Not Found");
          }
          user.createdEvents.push(event);
          const updatedUser = await user.save();
          return { ...result._doc, _id: result.id };
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
      }
    },
    graphiql: true
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-gql-app-academind", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Started on PORT 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
