import { app } from './app';
import { env } from './config/env';
import { db } from './config/database';

async function bootstrap() {
  try {
    // Attempt database connection
    await db.query('SELECT 1');
    console.log('Database connection established successfully.');

    // Start server
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

bootstrap();
