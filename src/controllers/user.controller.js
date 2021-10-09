const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

router.get("", async function (req, res) {
  const users = await User.find().lean().exec();
  return res.status(201).json({ users });
});

router.get("/getById/:id", async function (req, res) {
  const user = await User.findById(req.params.id);
  return res.status(201).json({ user });
});

// get all the students
router.get("/students", async function (req, res) {
  const students = await User.find({ role: "student" }).lean().exec();
  return res.status(201).json({ students });
});

// get all the teachers
router.get("/teachers", async function (req, res) {
  const teachers = await User.find({ role: "teacher" }).lean().exec();
  return res.status(201).json({ teachers });
});

module.exports = router;
