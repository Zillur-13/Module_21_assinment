
const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    getAllUsers, 
    updateUserProfile, 
    deleteUser 
} = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.get('/all', getAllUsers);
router.put('/updateUser', authenticateUser, updateUserProfile);
router.delete('/deleteUser', authenticateUser, deleteUser);

module.exports = router;
