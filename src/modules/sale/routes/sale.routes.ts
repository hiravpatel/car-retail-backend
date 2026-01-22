import { Router } from 'express';
import {
    createSale,
    getAllSales,
    getSaleById,
} from '../controllers/sale.controller';
import { protect, restrictTo } from '../../../core/middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Car sales management
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales records
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sales
 *   post:
 *     summary: Record a new car sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vehicleId, customerId]
 *             properties:
 *               vehicleId: { type: string }
 *               customerId: { type: string }
 *               discount: { type: number }
 *               tax: { type: number }
 *     responses:
 *       201:
 *         description: Sale recorded successfully
 */
router.route('/')
    .get(protect, restrictTo('ADMIN', 'STAFF'), getAllSales)
    .post(protect, restrictTo('ADMIN', 'STAFF'), createSale);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale detail by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Sale detail
 */
router.get('/:id', protect, restrictTo('ADMIN', 'STAFF'), getSaleById);

export default router;
