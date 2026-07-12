import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/error.middleware';

export const app: Express = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Base Route
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'TransitOps Backend API is running'
  });
});

// Error handling middleware MUST be last
app.use(errorMiddleware);
