import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

export default router;
