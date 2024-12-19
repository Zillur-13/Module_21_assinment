
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const {JWT_SECRET,JWT_EXPHIRE} = require("../config/config.js");
const {tokenEncode} = require("../utility/tokenUtility.js");
const bcrypt = require("bcryptjs");

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt); 

        const user = await User.create({ firstName, lastName, NIDNumber, phoneNumber, password:hashPassword, bloodGroup });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// User Login
exports.loginUser = async (req, res) => {
    try {

        const {phoneNumber,password} = req.body;
        const existUser = await User.findOne({phoneNumber:phoneNumber});
        if(!existUser){
            return res.status(404).json({message:"User not found, please register again"});
        }else{
           const isMatchPass = await bcrypt.compare(password,existUser.password);
          if(!isMatchPass) return res.status(404).json({message:"Wrong password"});
          const token = tokenEncode(existUser.phoneNumber,existUser._id);
          res.cookie('token', token, { httpOnly: true });

          return res.status(200).json({message:"Login Success",token});
        }

        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get Single User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.headers.user_id});
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({message:"User Profile Details",user});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Single User
exports.updateUserProfile = async (req, res) => {
    try {
                
            const user_id = req.headers.user_id;
            const reqBody = req.body;
            if(!user_id) res.status(404).json({message:"Need user id for update user"});
     
               if(reqBody.password){
                const salt = await bcrypt.genSalt(10);
                 reqBody.password = await bcrypt.hash(req.body.password,salt); 
               }


            const updateUser = await User.findByIdAndUpdate(user_id,reqBody,{new:true});

            if(!updateUser) res.status(404).json({message:"User not found"})

            res.status(200).json({message:"User Data updated successfully", updateUser})


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.headers.user_id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
