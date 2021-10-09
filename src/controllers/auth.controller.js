const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
    return jwt.sign({user:user}, process.env.JWT_SECRET_KEY);
}
const register = async (req, res) => {
    let user;
    try {
        // check if the email provided already exists in the database
        user = await User.findOne({ email: req.body.email }).lean().exec();
        
        // if yes then throw an exception with status code of 404
        
        if (user) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });
        
        // if no then create a user with the information provided in the requsest body
        user = await User.create(req.body);
        
        if (!user) return res.status(500).send({ status: "failed", message: "Please try again later" });
    
        // create a token for that user
        const token = newToken(user);
        // we will return the response with the user and token
        res.status(201).json({ user, token });   
    } catch (err) {
        console.log('err:', err)
        return res.status(500).send({ status: "failed", message: "Please try again later" });
    }
}

const login = async (req, res) => {
    try {
        //if user with email exists
        let user = await User.findOne({ email: req.body.email }).exec();

        // if not then throw an error of status code 400
        if (!user) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if yes then we need to check the password
        const match = await user.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ status: "failed", message: "Please try with a different email and password" });

        // if the password match the token and  send the token;
        const token = newToken(user);
        return res.status(201).json({ user, token });
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