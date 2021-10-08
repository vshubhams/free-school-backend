const express = require("express");
const connect = require("./config/db");

const app = express();

app.listen(3001, async function () {
    await connect();
    console.log("Listining on port 3001");
});