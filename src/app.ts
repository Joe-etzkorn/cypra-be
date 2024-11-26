import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import protectedRoutes from './routes/protected.route';
import userRoutes from './routes/user.route';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes);

export default app;
