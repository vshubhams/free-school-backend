const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");

const newToken = (student) => {
    return jwt.sign({student:student}, process.env.JWT_SECRET_KEY);
}
const register = async (req, res) => {
    let student;
    try {
        // check if the email provided already exists in the database
        student = await Student.findOne({ email: req.body.email }).lean().exec();
        
        // if yes then throw an exception with status code of 404
        
        if (student) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });
        
        // if no then create a student with the information provided in the requsest body
        student = await Student.create(req.body);
        
        if (!student) return res.status(500).send({ status: "failed", message: "Please try again later" });
    
        // create a token for that student
        const token = newToken(student);
        // we will return the response with the student and token
        res.status(201).json({ student, token });   
    } catch (err) {
        console.log('err:', err)
        return res.status(500).send({ status: "failed", message: "Please try again later" });
    }
}

const login = async (req, res) => {
    try {
        //if student with email exists
        let student = await Student.findOne({ email: req.body.email }).exec();

        // if not then throw an error of status code 400
        if (!student) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if yes then we need to check the password
        const match = await student.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if the password match the token and  send the token;
        const token = newToken(student);
        return res.status(201).json({ token: token });
    }
    catch (err) {
        console.log('err:', err)
        return res.status(500).send({ status: "failed", message: "Please try again later" });
    }
}

module.exports = {
    register,
    login
};