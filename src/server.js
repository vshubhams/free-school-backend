const express = require("express");
const connect = require("./config/db");

const app = express();
app.use(express.json());

const { register, login } = require("./controllers/auth.controller");
const studentController = require("./controllers/student.controller");

const {teacherRegister,teacherLogin} = require("./controllers/auth.teacher.controller");

app.post("/student/register", register);
app.post("/student/login", login);

app.post("/teacher/register", teacherRegister);
app.post("/teacher/login", teacherLogin);



app.use("/students", studentController);

const port = process.env.PORT || 3001;
app.listen(port, async function () {
    try {
        await connect();
        console.log(`Listen to port ${port}`);
    } catch (error) {
        console.log("error", error);
    }
});