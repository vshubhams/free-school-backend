const express = require('express');

const router = express.Router();

const Class = require("../models/class.model");

router.post("", async function (req, res) {
    const my_class = await Class.create(req.body);
    return res.status(200).json({ my_class });
})

// get all classes
router.get("", async function (req, res) {
    const classes = await Class.find().populate("teacher").sort({_id:-1}).lean().exec();
    return res.status(201).json({ classes });
});
// get all classes by a teacher Id;
router.get("/teacher/:id", async function (req, res) {
    const classes = await Class.find({teacher:req.params.id}).populate("teacher").sort({_id:-1}).lean().exec();
    return res.status(201).json({ classes });
});
// get all classes of a specific subject;
router.get("/subject/:subject", async function (req, res) {
    const classes = await Class.find({subject:req.params.subject}).populate("teacher").sort({_id:-1}).lean().exec();
    return res.status(201).json({ classes });
});

module.exports = router