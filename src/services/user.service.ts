import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { Role } from '../enums/role.enum';
import { Message } from '../enums/message.enum';
import sendAspireRequest from '../utils/aspire-request';
import RequestedAccount from '../models/requestedAccount.model';
import UserInvitation from '../models/userInvitation.model';
import { Op } from 'sequelize';

interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  clientId: string;
  clientSecret: string;
}

export const createUser = async (
  userData: CreateUserInput,
): Promise<User | null> => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (existingUser) {
      throw new Error(Message.EMAIL_ALREADY_EXISTS);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    if (userData.clientId && userData.clientSecret) {
      // Send Aspire request for credentials validation
      await sendAspireRequest('POST', '/Authorization', {
        ClientId: userData.clientId,
        Secret: userData.clientSecret,
      });
    }

    const requestedAccount = await RequestedAccount.findOne({
      where: {
        email: userData.email,
        token: {
          [Op.ne]: null,
        },
      },
    });
    const userInvitation = await UserInvitation.findOne({
      where: {
        email: userData.email,
        token: {
          [Op.ne]: null,
        },
      },
    });

    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      companyName: userData.companyName,
      clientId: userData.clientId,
      clientSecret: userData.clientSecret,
      roleId: requestedAccount ? Role.ADMIN : Role.USER,
      parentId: userInvitation ? userInvitation.invitedUserId : null,
      isAdministrator: requestedAccount ? true : false,
    });

    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
