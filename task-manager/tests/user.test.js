const request = require("supertest");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/User");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "demo1@demo.com",
  password: "ho2892Qdheo!",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JSON_WEB_TOKEN) }]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should SignUp a New User", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Harshith",
      email: "demo@demo.com",
      password: "12345"
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: "Harshith",
      email: "demo@demo.com"
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe("12345");
});

test("Should Login Existing User", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

test("Should Not Login Non Existing User", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "demo@demo.com",
      password: userOne.password
    })
    .expect(400);
});

test("Should Get Profile For User", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should Not Get Profile For Unauthenticated Users", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should Delete User ", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should Not Delete User Unauthenticated", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should Upload Avatar Image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});
