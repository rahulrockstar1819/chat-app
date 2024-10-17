import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

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
        
        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;
       
        const newUser = new User({
            username,
            fullname,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
            
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
           
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        // Log specific details of the error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error', error });
        }
        res.status(500).json({ message: 'Error creating user', error });
    }
}


export const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        generateTokenAndSetCookie(user._id, res);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: `Welcome to the chat ${user.fullname}`,
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            gender: user.gender
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
}