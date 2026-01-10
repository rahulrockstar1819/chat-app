// hooks/useProfilePictureWithPreview.js
import { useState, useCallback } from 'react';

export const useProfilePictureWithPreview = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    progress: 0,
    uploadedImage: null,
    previewUrl: null,
    selectedFile: null,
  });

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Generate preview for selected file
  const generatePreview = useCallback((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  // Handle file selection with preview
  const handleFileSelect = async (file) => {
    if (!file) {
      updateState({
        selectedFile: null,
        previewUrl: null,
        error: null,
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const error = new Error('Please select an image file (JPEG, PNG, GIF, etc.)');
      updateState({ error: error.message });
      throw error;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      const error = new Error('File size must be less than 5MB');
      updateState({ error: error.message });
      throw error;
    }

    try {
      const previewUrl = await generatePreview(file);
      updateState({
        selectedFile: file,
        previewUrl,
        error: null,
      });
    } catch (error) {
      updateState({ error: 'Failed to generate preview' });
      throw error;
    }
  };

  // Upload profile picture
  const uploadProfilePic = async (file = state.selectedFile) => {
    if (!file) {
      const error = new Error('No file selected');
      updateState({ error: error.message });
      throw error;
    }

    updateState({
      loading: true,
      error: null,
      progress: 0,
    });

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        updateState(prev => ({
          progress: prev.progress < 80 ? prev.progress + 10 : prev.progress
        }));
      }, 200);

      const response = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error uploading profile picture');
      }

      const result = await response.json();
      
      updateState({
        loading: false,
        progress: 100,
        uploadedImage: result.data,
        selectedFile: null,
        previewUrl: null,
      });

      return result.data;

    } catch (error) {
      console.error('Upload error:', error);
      updateState({
        loading: false,
        error: error.message,
        progress: 0,
      });
      throw error;
    }
  };

  // Clear all state
  const clearAll = () => {
    updateState({
      loading: false,
      error: null,
      progress: 0,
      uploadedImage: null,
      previewUrl: null,
      selectedFile: null,
    });
  };

  // Clear error only
  const clearError = () => {
    updateState({ error: null });
  };

  // Remove selected file and preview
  const removeSelection = () => {
    updateState({
      selectedFile: null,
      previewUrl: null,
      error: null,
    });
  };

  return {
    // State
    loading: state.loading,
    error: state.error,
    progress: state.progress,
    uploadedImage: state.uploadedImage,
    previewUrl: state.previewUrl,
    selectedFile: state.selectedFile,
    
    // Actions
    handleFileSelect,
    uploadProfilePic,
    clearAll,
    clearError,
    removeSelection,
  };
};

export default useProfilePictureWithPreview;
