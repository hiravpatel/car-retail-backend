import { Router } from 'express';
import { getDashboardStats, getAllReports } from '../controllers/report.controller';
import { protect, restrictTo } from '../../../core/middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports and analytics
 */

/**
 * @swagger
 * /reports/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 */
router.get('/dashboard', protect, restrictTo('ADMIN'), getDashboardStats);

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get all saved reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 */
router.get('/', protect, restrictTo('ADMIN'), getAllReports);

export default router;
