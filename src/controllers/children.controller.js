const express = require('express');

const router = express.Router();

const Children = require("../models/children.model");

router.get("", async function (req, res) {
    const children = await Children.find().lean().exec();
    return res.status(201).json({ children });
});

module.exports = router