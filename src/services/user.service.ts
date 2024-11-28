import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Message } from '../enums/message.enum';
import { AwsRole, Role } from '../enums/role.enum';
import RequestedAccount from '../models/requestedAccount.model';
import User from '../models/user.model';
import UserInvitation from '../models/userInvitation.model';
import sendAspireRequest from '../utils/aspire-request';
import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID!,
    process.env.AWS_SECRET_ACCESS_KEY!,
    process.env.AWS_SESSION_TOKEN,
  ),
});

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
        userId: {
          [Op.eq]: null,
        }
      },
    });

    const userInvitation = await UserInvitation.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!requestedAccount && !userInvitation) {
      throw new Error(Message.COMMON_ERROR);
    }

    const role = requestedAccount
      ? Role.ADMIN
      : userInvitation
        ? Role.USER
        : Role.USER;
    const cognitoRole = role === Role.ADMIN ? AwsRole.ADMIN : AwsRole.USER;

    const params: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: userData.email,
      UserAttributes: [
        { Name: 'email', Value: userData.email },
        { Name: 'given_name', Value: userData.firstName },
        { Name: 'family_name', Value: userData.lastName },
      ],
      TemporaryPassword: userData.password,
    };

    const cognitoResponse = await cognito.adminCreateUser(params).promise();

    await cognito
      .adminAddUserToGroup({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: userData.email,
        GroupName: cognitoRole,
      })
      .promise();
    await cognito
      .adminSetUserPassword({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: userData.email,
        Password: userData.password,
        Permanent: true,
      })
      .promise();
    await cognito
      .adminUpdateUserAttributes({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: userData.email,
        UserAttributes: [
          { Name: 'email_verified', Value: 'true' }, // Set email as verified
        ],
      })
      .promise();

    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      companyName: userData.companyName,
      clientId: userData.clientId,
      clientSecret: userData.clientSecret,
      roleId: role,
      parentId: userInvitation ? userInvitation.invitedUserId : null,
      isAdministrator: requestedAccount ? 1 : 0,
      userCognitoId: cognitoResponse.User?.Username,
    });

    if (requestedAccount) {
      await requestedAccount.update({ userId: user.id });
    }

    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
