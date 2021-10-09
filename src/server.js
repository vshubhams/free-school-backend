const express = require("express");
const connect = require("./config/db");

const app = express();
app.use(express.json());

const { register, login } = require("./controllers/auth.controller");

const userController = require("./controllers/user.controller");
const classController = require("./controllers/class.controller");
const childrenController = require("./controllers/children.controller");


app.post("/register", register);
app.post("/login", login);

app.use("/users", userController);
app.use("/classes", classController);
app.use("/children", childrenController);

const port = process.env.PORT || 3001;
app.listen(port, async function () {
    try {
        await connect();
        console.log(`Listen to port ${port}`);
    } catch (error) {
        console.log("error", error);
    }
});