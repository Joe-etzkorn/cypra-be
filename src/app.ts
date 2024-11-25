import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import protectedRoutes from './routes/protected.route';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/protected', protectedRoutes);

export default app;
