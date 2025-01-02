import { Router } from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/uploadController';
import { validateFileType } from '../middleware/fileValidation';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

router.post(
  '/upload',
  upload.single('file'),
  validateFileType(['application/pdf', 'text/plain']),
  uploadDocument
);

export default router;
