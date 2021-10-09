const express = require('express');

const router = express.Router();

const Donator = require("../models/donator.modal");

router.post("", async function (req, res) {
    const donator = await Donator.create(req.body);
    return res.status(201).json({ donator });
});
router.get("", async function (req, res) {
    const donator = await Donator.find().lean().exec();
    return res.status(200).json({ donator });
})
module.exports = router