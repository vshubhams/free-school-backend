const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    subject: { type: String, required: true },
    profile_url:{type:String,required:false}
}, {
    versionKey: false,
});

teacherSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
});

teacherSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function (err, same) {
            if (err) return reject(err);

            resolve(same);
        });
    });

}

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;