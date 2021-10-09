const mongoose = require("mongoose");

const donatorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false},
    amount: { type: Number, required: true },
    phone: { type: String, required: false },
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children",
        required:true
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model("donator", donatorSchema);