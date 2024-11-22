import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'cypra-access-token';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'cypra-refresh-token';

export const generateToken = (user: any, type: 'access' | 'refresh') => {
  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  const expiresIn = type === 'access' ? '15m' : '7d';

  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
}; 