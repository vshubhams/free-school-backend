const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: false },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required:true
    }
}, {
    versionKey: false,
    timestamps:true
});
module.exports = mongoose.model("class", classSchema);
