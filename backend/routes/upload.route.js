import { Router } from 'express';
const router = Router();
import { uploadSingle as _uploadSingle, uploadMultiple as _uploadMultiple, deleteFile, getFiles } from '../controllers/upload.controller.js';
import { uploadSingle, uploadMultiple } from '../middleware/uploadMiddleware.js';

// Routes
router.post('/upload/single', uploadSingle, _uploadSingle);
router.post('/upload/multiple', uploadMultiple, _uploadMultiple);
router.delete('/delete/:publicId', deleteFile);
router.get('/files', getFiles);

export default router;