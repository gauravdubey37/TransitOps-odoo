import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/error.middleware';

export const app: Express = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

import driverRoutes from './modules/driver/routes';
import vehicleRoutes from './modules/vehicle/routes';
import tripRoutes from './modules/trip/routes';
import depotRoutes from './modules/depot/routes';
import routeRoutes from './modules/route/routes';
import authRoutes from './modules/auth/routes';
import userRoutes from './modules/user/routes';
import fuelRoutes from './modules/fuel/routes';
import expenseRoutes from './modules/expense/routes';
import maintenanceRoutes from './modules/maintenance/routes';
import notificationRoutes from './modules/notification/routes';
import dashboardRoutes from './modules/dashboard/routes';
import { authMiddleware } from './middleware/auth.middleware';

// Base Route
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'TransitOps Backend API is running'
  });
});

// Public Module Routes
app.use('/api/v1/auth', authRoutes);

// Protected Module Routes
app.use('/api/v1/users', authMiddleware, userRoutes);
app.use('/api/v1/drivers', authMiddleware, driverRoutes);
app.use('/api/v1/vehicles', authMiddleware, vehicleRoutes);
app.use('/api/v1/trips', authMiddleware, tripRoutes);
app.use('/api/v1/depots', authMiddleware, depotRoutes);
app.use('/api/v1/routes', authMiddleware, routeRoutes);
app.use('/api/v1/fuel', authMiddleware, fuelRoutes);
app.use('/api/v1/expenses', authMiddleware, expenseRoutes);
app.use('/api/v1/maintenance', authMiddleware, maintenanceRoutes);
app.use('/api/v1/notifications', authMiddleware, notificationRoutes);
app.use('/api/v1/dashboard', authMiddleware, dashboardRoutes);

// Error handling middleware MUST be last
app.use(errorMiddleware);
