import { Router } from 'express';
import {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getAllCategories,
} from '../controllers/vehicle.controller';
import { protect, restrictTo } from '../../../core/middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, RENTED, SOLD, MAINTENANCE]
 *     responses:
 *       200:
 *         description: List of vehicles
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, brand, model, year, categoryName, rentalPrice, salePrice, specs]
 *             properties:
 *               name: { type: string }
 *               brand: { type: string }
 *               model: { type: string }
 *               year: { type: integer }
 *               categoryName: { type: string }
 *               rentalPrice: { type: number }
 *               salePrice: { type: number }
 *               specs: { type: object }
 *               images: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Vehicle created
 */
router.route('/')
    .get(getAllVehicles)
    .post(protect, restrictTo('ADMIN', 'STAFF'), createVehicle);

/**
 * @swagger
 * /vehicles/categories:
 *   get:
 *     summary: Get all vehicle categories
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', getAllCategories);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vehicle detail
 *   patch:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Vehicle updated
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Vehicle deleted
 */
router.route('/:id')
    .get(getVehicleById)
    .patch(protect, restrictTo('ADMIN', 'STAFF'), updateVehicle)
    .delete(protect, restrictTo('ADMIN'), deleteVehicle);

export default router;
