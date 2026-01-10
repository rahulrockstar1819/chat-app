import CloudinaryService from '../utils/cloudinary.js';

class UploadController {
  // Single file upload
  static async uploadSingle(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await CloudinaryService.uploadFile(req.file.path, {
        folder: 'my-app/uploads'
      });

      res.json({
        message: 'File uploaded successfully',
        data: {
          public_id: result.public_id,
          url: result.secure_url,
          format: result.format,
          bytes: result.bytes
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Multiple files upload
  static async uploadMultiple(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const results = await CloudinaryService.uploadMultipleFiles(req.files);

      res.json({
        message: 'Files uploaded successfully',
        data: results.map(result => ({
          public_id: result.public_id,
          url: result.secure_url,
          format: result.format,
          bytes: result.bytes
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete file
  static async deleteFile(req, res) {
    try {
      const { publicId } = req.params;
      const result = await CloudinaryService.deleteFile(publicId);
      
      res.json({
        message: 'File deleted successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all files
  static async getFiles(req, res) {
    try {
      const resources = await CloudinaryService.getFolderResources('my-app');
      
      res.json({
        message: 'Files fetched successfully',
        data: resources
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Export as named exports
export const uploadSingle = UploadController.uploadSingle;
export const uploadMultiple = UploadController.uploadMultiple;
export const deleteFile = UploadController.deleteFile;
export const getFiles = UploadController.getFiles;
export default UploadController;