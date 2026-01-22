import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './core/middlewares/error.middleware';

import authRoutes from './modules/auth/routes/auth.routes';
import vehicleRoutes from './modules/vehicle/routes/vehicle.routes';
import rentalRoutes from './modules/rental/routes/rental.routes';
import saleRoutes from './modules/sale/routes/sale.routes';
import paymentRoutes from './modules/payment/routes/payment.routes';
import reportRoutes from './modules/report/routes/report.routes';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', rentalRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Car Sell & Rental Agency API' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
