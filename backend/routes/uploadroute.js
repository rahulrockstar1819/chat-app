import { Router } from 'express';
import { upload, uploadProfilePic } from '../controllers/uploadController'; // Import controller

const router = Router();

// Define the route for profile picture upload
router.post('/upload-profile-pic', 
upload.single('profilePic'), uploadProfilePic); // Handles POST request to upload image

export default router;
