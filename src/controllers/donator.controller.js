const express = require('express');

const router = express.Router();

const Donator = require("../models/donator.modal");

router.post("", async function (req, res) {
    const donator = await Donator.create(req.body);
    return res.status(201).json({ donator });
});

module.exports = router