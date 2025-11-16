import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import HazardReport from '../models/HazardReport';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get current user's profile
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Get user's reports
    const userReports = await HazardReport.find({ reportedBy: user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    const stats = {
      totalReports: userReports.length,
      verifiedReports: userReports.filter(r => r.verified).length,
      avgSeverity: userReports.length > 0
        ? userReports.reduce((sum, r) => sum + r.severity, 0) / userReports.length
        : 0,
    };

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      reports: userReports,
      stats,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error retrieving profile' });
  }
});

export default router;

