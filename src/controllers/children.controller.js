const express = require('express');

const router = express.Router();

const Children = require("../models/children.model");

router.get("", async function (req, res) {
    const children = await Children.find().lean().exec();
    return res.status(201).json({ children });
});

router.get("/:id", async function (req, res) {
    const children = await Children.findById(req.params.id).lean().exec();
    return res.status(201).json({ children });
});

router.patch("/:id/add/:amount",async function (req, res) {
    let children = await Children.findById(req.params.id).lean().exec();
    const sum = children.current_amt + Number(req.params.amount);
    children = await Children.findByIdAndUpdate(req.params.id,{current_amt:sum},{new:true})
    return res.status(201).json({ children });
})

module.exports = router