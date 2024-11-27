import app from './app';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { setupAssociations } from './models/associations';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Setup database associations
setupAssociations();

// PostgreSQL Database Connection
const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test Database Connection
dbPool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
