import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import protectedRoutes from './routes/protected.route';
import userRoutes from './routes/user.route';
import requestedAccountRoutes from './routes/requested-account.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requested-account', requestedAccountRoutes);

export default app;
