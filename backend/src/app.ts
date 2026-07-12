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

// Base Route
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'TransitOps Backend API is running'
  });
});

// Module Routes
app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/depots', depotRoutes);

// Error handling middleware MUST be last
app.use(errorMiddleware);
