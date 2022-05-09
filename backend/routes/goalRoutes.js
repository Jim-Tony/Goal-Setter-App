const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {getGoal,setGoal,updateGoal,deleteGoal} = require('../controllers/goalController');
router.route('/').get(protect,getGoal).post(protect,setGoal);
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal);
module.exports = router;