const router = require("express").Router();

const Todo = require("../models/Todo");

// CRUD APPLICATION OF TODO

// GET BY ID
router.get("/api/v1/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findById(id);
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// GET
router.get("/api/v1/todo", async (req, res) => {
  try {
    const data = await Todo.find();
    res.send(data);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// POST
router.post("/api/v1/todo", async (req, res) => {
  try {
    const data = await new Todo(req.body);
    data.save();
    return res.send({ success: true, data });
  } catch (e) {
    return res.status(500).json(e);
  }
});

// DELETE ONE
router.delete("/api/v1/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findByIdAndDelete(id);

    res.send({ success: true, data });
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Delete ALL
router.delete("/api/v1/todo", async (req, res) => {
  try {
    const res = await Todo.deleteMany();
    res.send({ success: true, res });
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Update
router.patch("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id;
  const keys = Object.keys(req.body);
  try {
    const data = await Todo.findById(id);
    keys.forEach(key => {
      data[key] = req.body[key];
    });

    await data.save();
    res.send({ success: true, data });
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
