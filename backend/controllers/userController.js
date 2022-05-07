const asyncHandler = require('express-async-handler');
// @desc Register New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res)=>{
    res.json({message:'new user'})
})

// @desc Authenticate a  User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message:'user logged in'})
})

// @desc Authenticate a  User
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req,res)=>{
    res.json({message:'user data displayed'})
})


module.exports = {
    registerUser,
    loginUser,
    getMe,
}