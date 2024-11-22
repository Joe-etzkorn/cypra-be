import express from 'express';
import authRoutes from './routes/auth.route';
import protectedRoutes from './routes/protected.route';


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/protected', protectedRoutes);

export default app;
