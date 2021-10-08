const express = require('express');

const router = express.Router();

const Teacher = require("../models/teacher.model");

router.get("", async function (req, res) {
    const teachers = await Teacher.find();
    return res.status(201).json({ teachers });
});

module.exports = router