import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import User from '../models/user.model';
import Role from '../models/role.model';
import { Message } from '../enums/message.enum';

export class AuthService {
  async login(
    email: string,
    password: string,
    isSuperAdmin: boolean = false,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    clientCredentials?: { clientId: string; clientSecret: string };
  } | null> {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ['name'],
        },
      ],
    });

    if (!user) return null;

    if (isSuperAdmin && user.roleId !== 1) {
      throw new Error(Message.PERMISSION_DENIED);
    }

    if (user.roleId === 1 && !isSuperAdmin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const accessToken = generateToken(user, 'access');
    const refreshToken = generateToken(user, 'refresh');

    let clientCredentials;

    if (user.roleId === 3 && user.parentId) {
      const parentAdmin = await User.findOne({
        where: {
          id: user.parentId,
          roleId: 2, // admin
        },
      });

      if (parentAdmin && parentAdmin.clientId && parentAdmin.clientSecret) {
        clientCredentials = {
          clientId: parentAdmin.clientId,
          clientSecret: parentAdmin.clientSecret,
        };
      }
    }

    if (user.roleId === 2) {
      clientCredentials = {
        clientId: user.clientId,
        clientSecret: user.clientSecret,
      };
    }

    return {
      accessToken,
      refreshToken,
      ...(clientCredentials && { clientCredentials }),
    };
  }
}
