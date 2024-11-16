// /src/services/userService.js

const uploadProfilePic = async (formData) => {
  const response = await fetch('/api/upload-profile-pic', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error uploading profile picture.');
  }

  return data;  // Return the response from the backend
};

export { uploadProfilePic };
