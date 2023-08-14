const {Router} = require('express');
require('dotenv').config();
const {UserModel} = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;

const userRouter = Router();

//Register
userRouter.post('/register', async (req,res) => {
    try {
        const {name, email, password} = req.body;
        const isUser = await UserModel.findOne({email});
        if(isUser){
            res.status(200).json({msg: "User already exists"});
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new UserModel({name, email, password: hash});
            await user.save();
            res.status(201).json({msg: "User Registered"});
        })
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

//Login
userRouter.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(201).json({
                        "msg": "Login Successful",
                        "token": jwt.sign({ userID: user._id, email: user.email }, JWT_SECRET) 
                    });
                } else {
                    res.status(400).json({msg: "Wrong credentials"});
                }
            });
        } else {
            res.status(400).json({msg: "User does not exist"});
        }
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

module.exports = userRouter;