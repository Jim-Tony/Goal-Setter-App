const Goal = require('../models/goalModel');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
// @desc GET_GOAL
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req,res)=>{
    console.log(req.user);
    const goals = await Goal.find({user:req.user._id});
    res.status(200).json(goals);
})

// @desc SET_GOAL
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
    
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    console.log(goal);
    res.status(200).json(goal)
})

// @desc UPDATE_GOAL
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error('Goal not found');
    }
    const user = await User.findById(req.user.id);
    // console.log(goal,user);
    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    if(goal.user !== user._id.toString()){
        res.status(400);
        throw new Error('User Not Authorized');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updatedGoal)
})

// @desc DELTE_GOAL
// @route DELTE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error('Goal not found');
    }
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    if(goal.user !== user._id.toString()){
        res.status(400);
        throw new Error('User Not Authorized');
    }
    await goal.remove();
    res.status(200).json({id:req.params.id});
})
module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}