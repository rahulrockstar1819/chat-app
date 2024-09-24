//import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {

        const { username, fullname, password, confirmPassword, gender } = req.body;
      
        if (!username || !fullname || !password || !confirmPassword || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
       await User.deleteMany({ username: null });
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            fullname,
            password: hashedPassword,
            gender
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            gender: newUser.gender
        })
    
    } catch (error) {
        console.error('Error creating user:', error);
        // Log specific details of the error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error', error });
        }
        res.status(500).json({ message: 'Error creating user', error });
    }
}


export const login = (req, res) => {
    res.send("Login Route");
    console.log("login route");
}

export const logout = (req, res) => {
    res.send("Logout Route")
    console.log("logout route");
}