import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import User from '../models/user.model';

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const accessToken = generateToken(user, 'access');
      const refreshToken = generateToken(user, 'refresh');
      return { accessToken, refreshToken };
    }
  }

  return null;
};
