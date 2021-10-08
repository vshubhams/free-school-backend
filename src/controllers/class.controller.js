const express = require('express');

const router = express.Router();

const Class = require("../models/class.model");

router.post("", async function (req, res) {
    const my_class = await Class.create(req.body);
    return res.status(200).json({ my_class });
})

router.get("", async function (req, res) {
    const classes = await Class.find().populate("teacher").sort({_id:-1}).lean().exec();
    return res.status(201).json({ classes });
});

module.exports = router