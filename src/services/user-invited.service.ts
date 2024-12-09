import { generateUniqueToken } from '../utils/common';
import { Message } from '../enums/message.enum';
import UserInvitation from '../models/userInvitation.model';
import User from '../models/user.model';
import { Role } from '../enums/role.enum';
import { inviteUserTemplate } from '../templates/invite-user';
import { EmailService } from './email.service';

interface InviteUserInput {
  firstName: string;
  lastName: string;
  email: string;
}

export class UserInviteService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async inviteUser(data: InviteUserInput, invitedUserId: number): Promise<UserInvitation> {
    try {
      const companyAdmin = await User.findOne({
        where: {
          id: invitedUserId,
          isAdministrator: 1 // the one who invited user must be admin
        }
      })

      if (!companyAdmin) {
        throw new Error(Message.MUST_BE_ADMIN);
      }

      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) {
        throw new Error(Message.EMAIL_ALREADY_EXISTS);
      }

      const existingInvitation = await UserInvitation.findOne({
        where: { email: data.email }
      });
      if (existingInvitation) {
        throw new Error(Message.EMAIL_ALREADY_INVITED);
      }

      const token = generateUniqueToken();

      const invitation = await UserInvitation.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        invitedUserId,
        token
      });


      const inviteLink = `${process.env.FRONTEND_URL}/user-invited?token=${token}`;
      const emailBody = inviteUserTemplate(
        data.firstName,
        inviteLink,
        companyAdmin.companyName,
      );

      await this.emailService.sendEmail({
        from: process.env.SMTP_MAIL_FROM!,
        to: data.email,
        subject: 'Invitation to join platform',
        body: emailBody,
      });

      return invitation;
    } catch (error) {
      console.error('Error inviting user:', error);
      throw error;
    }
  }

  async verifyInviteToken(
    token: string,
  ): Promise<UserInvitation | null> {
    if (!token) {
      throw new Error(Message.INVALID_TOKEN);
    }

    try {
      const userInvitation = await UserInvitation.findOne({
        where: { token },
        include: [
          {
            model: User,
            as: 'invitedUser',
            attributes: ['id', 'email', 'firstName', 'lastName'],
          },
        ],
      });

      if (!userInvitation) {
        throw new Error(Message.INVALID_TOKEN);
      }

      return userInvitation;
    } catch (error) {
      console.error('Error validating token:', error);
      throw error;
    }
  }
}
