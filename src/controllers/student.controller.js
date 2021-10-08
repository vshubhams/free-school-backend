const express = require('express');

const router = express.Router();

const Student = require("../models/student.model");

router.get("", async function (req, res) {
    const students = await Student.find();
    return res.status(201).json({ students });
});

module.exports = router