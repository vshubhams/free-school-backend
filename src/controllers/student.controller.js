const express = require('express');

const router = express.Router();

const Student = require("../models/student.model");

router.post("", async function (req, res) {
    const student = await Student.create(req.body);
    return res.status(201).json({ student });
});

module.exports = router