const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher.model");

const newToken = (teacher) => {
    return jwt.sign({teacher:teacher}, process.env.JWT_SECRET_KEY);
}
const teacherRegister = async (req, res) => {
    let teacher;
    try {
        // check if the email provided already exists in the database
        teacher = await Teacher.findOne({ email: req.body.email }).lean().exec();
        
        // if yes then throw an exception with status code of 404
        
        if (teacher) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });
        
        // if no then create a teacher with the information provided in the requsest body
        teacher = await Teacher.create(req.body);
        
        if (!teacher) return res.status(500).send({ status: "failed", message: "Please try again later" });
    
        // create a token for that teacher
        const token = newToken(teacher);
        // we will return the response with the teacher and token
        res.status(201).json({ teacher, token });   
    } catch (err) {
        console.log('err:', err)
        return res.status(500).send({ status: "failed", message: "Please try again later" });
    }
}

const teacherLogin = async (req, res) => {
    try {
        //if teacher with email exists
        let teacher = await Teacher.findOne({ email: req.body.email }).exec();

        // if not then throw an error of status code 400
        if (!teacher) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if yes then we need to check the password
        const match = await teacher.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if the password match the token and  send the token;
        const token = newToken(teacher);
        return res.status(201).json({ token: token });
    }
    catch (err) {
        console.log('err:', err)
        return res.status(500).send({ status: "failed", message: "Please try again later" });
    }
}

module.exports = {
    teacherRegister,
    teacherLogin
};