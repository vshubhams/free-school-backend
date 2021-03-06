const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: false },
    class: { type: String, required: false },
    time: { type: String, required: true },
    meetLink:{type:String,required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }
}, {
    versionKey: false,
    timestamps:true
});
module.exports = mongoose.model("class", classSchema);
