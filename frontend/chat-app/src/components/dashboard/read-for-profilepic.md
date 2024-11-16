// /src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { fetchUserProfile } from '../services/userService'; // Import the service to get user profile

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.fullname}'s Profile</h1>
      <img src={user.profilePic} alt="Profile" width="100" />
      <ProfilePictureUpload userId={user._id} />
    </div>
  );
};

export default ProfilePage;
