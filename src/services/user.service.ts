import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Message } from '../enums/message.enum';
import { AwsRole, Role } from '../enums/role.enum';
import RequestedAccount from '../models/requestedAccount.model';
import User from '../models/user.model';
import UserInvitation from '../models/userInvitation.model';
import sendAspireRequest from '../utils/aspire-request';
import AWS from 'aws-sdk';
import { CreateUserInput, UpdateUserInput } from '../interfaces/user.interface';

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID!,
    process.env.AWS_SECRET_ACCESS_KEY!,
    process.env.AWS_SESSION_TOKEN,
  ),
});

export class UserService {
  async createUser(userData: CreateUserInput): Promise<User | null> {
    try {
      await this.checkIfUserExists(userData.email);
      const hashedPassword = await this.hashPassword(userData.password);
      await this.validateAspireCredentials(userData);

      const { requestedAccount, userInvitation } = await this.getAccountAndInvitation(userData.email);
      this.ensureAccountOrInvitationExists(requestedAccount, userInvitation);

      const role = this.determineRole(requestedAccount, userInvitation);
      const cognitoRole = this.getCognitoRole(role);

      const cognitoResponse = await this.createCognitoUser(userData, cognitoRole);
      const user = await this.createUserRecord(userData, hashedPassword, role, cognitoResponse, userInvitation);

      if (requestedAccount) {
        await requestedAccount.update({ userId: user.id });
      }

      return this.omitPassword(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error(Message.EMAIL_ALREADY_EXISTS);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async validateAspireCredentials(userData: CreateUserInput): Promise<void> {
    if (userData.clientId && userData.clientSecret) {
      await sendAspireRequest('POST', '/Authorization', {
        ClientId: userData.clientId,
        Secret: userData.clientSecret,
      });
    }
  }

  private async getAccountAndInvitation(email: string): Promise<{ requestedAccount: RequestedAccount | null, userInvitation: UserInvitation | null }> {
    const requestedAccount = await RequestedAccount.findOne({
      where: { email, userId: { [Op.eq]: null } },
    });
    const userInvitation = await UserInvitation.findOne({ where: { email } });
    return { requestedAccount, userInvitation };
  }

  private ensureAccountOrInvitationExists(requestedAccount: RequestedAccount | null, userInvitation: UserInvitation | null): void {
    if (!requestedAccount && !userInvitation) {
      throw new Error(Message.COMMON_ERROR);
    }
  }

  private determineRole(requestedAccount: RequestedAccount | null, userInvitation: UserInvitation | null): Role {
    return requestedAccount ? Role.ADMIN : Role.USER;
  }

  private getCognitoRole(role: Role): AwsRole {
    return role === Role.ADMIN ? AwsRole.ADMIN : AwsRole.USER;
  }

  private async createCognitoUser(userData: CreateUserInput, cognitoRole: AwsRole): Promise<AWS.CognitoIdentityServiceProvider.AdminCreateUserResponse> {
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

    await cognito.adminAddUserToGroup({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: userData.email,
      GroupName: cognitoRole,
    }).promise();

    await cognito.adminSetUserPassword({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: userData.email,
      Password: userData.password,
      Permanent: true,
    }).promise();

    await cognito.adminUpdateUserAttributes({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: userData.email,
      UserAttributes: [
        { Name: 'email_verified', Value: 'true' },
      ],
    }).promise();

    return cognitoResponse;
  }

  private async createUserRecord(userData: CreateUserInput, hashedPassword: string, role: Role, cognitoResponse: AWS.CognitoIdentityServiceProvider.AdminCreateUserResponse, userInvitation: UserInvitation | null): Promise<User> {
    return User.create({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      companyName: userData.companyName,
      clientId: userData.clientId,
      clientSecret: userData.clientSecret,
      roleId: role,
      parentId: userInvitation ? userInvitation.invitedUserId : null,
      isAdministrator: role === Role.ADMIN ? 1 : 0,
      userCognitoId: cognitoResponse.User?.Username,
    });
  }

  private omitPassword(user: User): User {
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword as User;
  }

  async updateUser(userCognitoId: string, userData: UpdateUserInput): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { userCognitoId } });
      
      if (!user) {
        throw new Error(Message.USER_NOT_FOUND);
      }

      await user.update({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      });

      await cognito.adminUpdateUserAttributes({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: user.email,
        UserAttributes: [
          { Name: 'given_name', Value: userData.firstName },
          { Name: 'family_name', Value: userData.lastName },
          ...(userData.phone ? [{ Name: 'phone_number', Value: userData.phone }] : []),
        ],
      }).promise();

      return this.omitPassword(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async getProfile(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error(Message.USER_NOT_FOUND);
      }
      return this.omitPassword(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
