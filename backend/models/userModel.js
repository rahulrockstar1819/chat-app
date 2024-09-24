import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
        trim: true // Remove whitespace
    },
    fullname: {
        type: String,
        required: true,
        trim: true // Remove whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforce minimum password length
    },
    gender: {
        type: String,
        enum: ['male', 'female'], // Allow specific values
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
