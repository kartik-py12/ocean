import express from 'express';
import { getSocialMediaAnalytics } from '../controllers/socialMediaController';

const router = express.Router();

// GET /api/social-media/analytics - Get social media analytics
router.get('/analytics', getSocialMediaAnalytics);

export default router;
