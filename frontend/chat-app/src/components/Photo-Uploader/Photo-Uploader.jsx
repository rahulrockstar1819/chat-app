// /src/components/ProfilePictureUpload.js

import React, { useState } from 'react';
import { uploadProfilePic } from '../services/userService'; // Import service to handle API call

const ProfilePictureUpload = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!image) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('profilePic', image);
    formData.append('userId', userId);  // Pass the user ID

    try {
      const response = await uploadProfilePic(formData);
      alert('Profile picture uploaded successfully!');
    } catch (err) {
      setError('Error uploading profile picture.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {image && <img src={URL.createObjectURL(image)} alt="Preview" width="100" />}
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
