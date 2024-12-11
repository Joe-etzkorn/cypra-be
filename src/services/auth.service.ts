import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import User from '../models/user.model';
import Role from '../models/role.model';
import { Message } from '../enums/message.enum';
import { generateUniqueToken } from '../utils/common';
import AWS from 'aws-sdk';
import { EmailService } from './email.service';
import { resetPasswordTemplate } from '../templates/reset-password';
interface ResetPasswordData {
  email: string;
  expiresAt: Date;
}

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
  // credentials: new AWS.Credentials(
  //   process.env.AWS_ACCESS_KEY_ID!,
  //   process.env.AWS_SECRET_ACCESS_KEY!,
  //   process.env.AWS_SESSION_TOKEN,
  // ),
});

export class AuthService {
  private static resetTokens: Map<string, ResetPasswordData> = new Map();
  private static TOKEN_EXPIRY = 3600000; // 1 hour
  private static cleanupInterval: NodeJS.Timeout | null = null;
  private emailService: EmailService;

  constructor() {
    this.startCleanupInterval();
    this.emailService = new EmailService();
  }

  private startCleanupInterval(): void {
    if (!AuthService.cleanupInterval) {
      AuthService.cleanupInterval = setInterval(
        () => {
          const now = new Date();
          AuthService.resetTokens.forEach((data, token) => {
            if (data.expiresAt < now) {
              AuthService.resetTokens.delete(token);
            }
          });
        },
        15 * 60 * 1000, // 15 minutes
      );
    }
  }

  private stopCleanupInterval(): void {
    if (AuthService.cleanupInterval) {
      clearInterval(AuthService.cleanupInterval);
      AuthService.cleanupInterval = null;
    }
  }

  public destroy(): void {
    this.stopCleanupInterval();
    AuthService.resetTokens.clear();
  }

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


  async forgotPassword(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error(Message.EMAIL_NOT_FOUND);
      }

      const resetToken = generateUniqueToken();
      const expiresAt = new Date(Date.now() + AuthService.TOKEN_EXPIRY);

      AuthService.resetTokens.set(resetToken, {
        email,
        expiresAt,
      });

      const resetPasswordLink = `${process.env.FRONTEND_URL}/set-password?token=${resetToken}`;

      const emailBody = resetPasswordTemplate(
        user.firstName,
        resetPasswordLink,
      );

      await this.emailService.sendEmail({
        from: process.env.SMTP_MAIL_FROM!,
        to: email,
        subject: 'Password Reset Request',
        body: emailBody,
      });

      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async verifyResetPasswordToken(token: string): Promise<string | null> {
    const resetData = AuthService.resetTokens.get(token);

    if (!resetData) {
      throw new Error(Message.INVALID_TOKEN);
    }

    if (resetData.expiresAt < new Date()) {
      AuthService.resetTokens.delete(token);
      throw new Error(Message.INVALID_TOKEN);
    }

    return resetData.email;
  }

  async deleteResetToken(token: string): Promise<void> {
    AuthService.resetTokens.delete(token);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const email = await this.verifyResetPasswordToken(token);
      if (!email) {
        throw new Error(Message.INVALID_TOKEN);
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error(Message.USER_NOT_FOUND);
      }

      const hashedPassword = await this.hashPassword(newPassword);

      //forgot password in cognito
      await cognito.adminSetUserPassword({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: email,
        Password: newPassword,
        Permanent: true
      }).promise();

      //update password in database
      await user.update({ password: hashedPassword });

      await this.deleteResetToken(token);

      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
}
