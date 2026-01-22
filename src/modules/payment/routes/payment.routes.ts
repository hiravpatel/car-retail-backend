import { Router } from 'express';
import {
    processPayment,
    getPaymentById,
    getAllPayments,
} from '../controllers/payment.controller';
import { protect, restrictTo } from '../../../core/middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, method]
 *             properties:
 *               amount: { type: number }
 *               method: { type: string, enum: [CASH, CARD, ONLINE] }
 *               bookingId: { type: string }
 *               saleId: { type: string }
 *     responses:
 *       201:
 *         description: Payment processed
 */
router.route('/')
    .get(protect, restrictTo('ADMIN', 'STAFF'), getAllPayments)
    .post(protect, processPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment detail
 */
router.get('/:id', protect, restrictTo('ADMIN', 'STAFF'), getPaymentById);

export default router;
