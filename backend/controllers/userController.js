const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
// @desc Register New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill the details');
    }
    //Check if user is already registered
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc Logging a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}  = req.body;
    const user = await User.findOne({email});
    // console.log(password,user.password);
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Getting user details
// @route GET /api/users/me
// @access private
const getMe = asyncHandler(async (req,res)=>{
    res.status(200).json(req.user);
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}