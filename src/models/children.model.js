const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
    image: { type: String, required: true },
    city: { type: String, required: true},
    details: { type: String, required: true},
    by: { type: String, required: true},
    amount: { type: String, required: true},
}, {
    versionKey: false,
});

module.exports = mongoose.model("children", childrenSchema);
