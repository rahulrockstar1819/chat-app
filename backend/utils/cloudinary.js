import cloudinary from '../config/cloudinary.config.js';

class CloudinaryService {
  // Upload file to Cloudinary
  static async uploadFile(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'my-app', // Base folder in Cloudinary
        resource_type: 'auto', // Auto-detect resource type
        ...options
      });
      return result;
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }

  // Upload multiple files
  static async uploadMultipleFiles(files) {
    try {
      const uploadPromises = files.map(file => 
        this.uploadFile(file.path, { folder: 'my-app/multiple' })
      );
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      throw new Error(`Multiple upload failed: ${error.message}`);
    }
  }

  // Delete file from Cloudinary
  static async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary delete failed: ${error.message}`);
    }
  }

  // Get resources from folder
  static async getFolderResources(folderPath) {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderPath,
        max_results: 50
      });
      return result.resources;
    } catch (error) {
      throw new Error(`Failed to fetch resources: ${error.message}`);
    }
  }
}

export default CloudinaryService;