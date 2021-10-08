const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
}, {
    versionKey: false,
});


studentSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
});

studentSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function (err, same) {
            if (err) return reject(err);

            resolve(same);
        });
    });

}

module.exports = mongoose.model("student", studentSchema);