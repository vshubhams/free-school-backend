const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;
const connect = () => {
    return mongoose.connect(uri);
};
module.exports = connect;