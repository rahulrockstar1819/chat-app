import cloudinary from '../config/cloudinaryConfig';  // Import Cloudinary config
import multerStorageCloudinary from 'multer-storage-cloudinary';
import { findById } from '../models/User';  // Assuming you have a User model



cloudinary.config({
    url: process.env.CLOUDINARY_URL  // This will automatically load cloud_name, api_key, and api_secret
  });
// Configure Multer storage to use Cloudinary
const storage = new multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-pictures', // Folder where images are stored in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'], // Allowed formats for upload
  },
});

const upload = require('multer')({ storage: storage });

// Controller function to handle the upload and save the image URL to MongoDB
const uploadProfilePic = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const fileUrl = req.file.secure_url;  // Get Cloudinary URL

  const userId = req.body.userId;  // Assume user ID is sent in the body

  try {
    const user = await findById(userId);  // Find user by ID
    if (user) {
      user.profilePic = fileUrl;  // Save Cloudinary image URL in MongoDB
      await user.save();
      return res.json({ message: 'Profile picture uploaded successfully!', fileUrl });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

export default { upload, uploadProfilePic};
