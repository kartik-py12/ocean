import { Router, Request, Response, NextFunction } from 'express';
import {
  createHazardReport,
  getHazardReports,
  getHazardReportById,
  updateHazardReport,
  deleteHazardReport,
} from '../controllers/hazardController';
import { authenticate } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { upload } from '../middleware/upload';

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// GET routes don't require authentication (public data)
// POST, PUT, DELETE require authentication
router.get('/', getHazardReports);
router.get('/:id', getHazardReportById);

// Protected routes
router.use(authenticate);

router.post(
  '/',
  upload.single('image'), // Handle single image upload with field name 'image'
  (err: any, req: Request, res: Response, next: NextFunction) => {
    // Handle multer errors
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
      }
      if (err.code === 'LIMIT_FILE_TYPE' || err.message?.includes('Only image files')) {
        return res.status(400).json({ message: 'Only image files are allowed!' });
      }
      return res.status(400).json({ message: err.message || 'File upload error' });
    }
    next();
  },
  [
    body('type').isIn(['Oil Spill', 'Debris', 'Pollution', 'Other']).withMessage('Invalid hazard type'),
    // Location validation - handle both JSON string and object
    // Make it optional during validation, let controller handle parsing
    body('location').optional().custom((value, { req }) => {
      const locationValue = value || req.body.location;
      if (!locationValue) {
        return true; // Let controller handle missing location
      }
      if (typeof locationValue === 'string') {
        try {
          const parsed = JSON.parse(locationValue);
          if (typeof parsed.lat !== 'number' || typeof parsed.lng !== 'number') {
            throw new Error('Invalid location format');
          }
          if (parsed.lat < -90 || parsed.lat > 90 || parsed.lng < -180 || parsed.lng > 180) {
            throw new Error('Invalid location coordinates');
          }
        } catch (e: any) {
          // Don't fail validation here, let controller handle it
          return true;
        }
      } else if (locationValue && (typeof locationValue.lat !== 'number' || typeof locationValue.lng !== 'number')) {
        // Invalid format, but let controller handle it
        return true;
      }
      return true;
    }),
    body('severity').custom((value) => {
      const severity = typeof value === 'string' ? parseInt(value) : value;
      if (isNaN(severity) || severity < 1 || severity > 10) {
        throw new Error('Severity must be between 1 and 10');
      }
      return true;
    }),
    validate,
  ],
  createHazardReport
);

router.put('/:id', updateHazardReport);
router.delete('/:id', deleteHazardReport);

export default router;

