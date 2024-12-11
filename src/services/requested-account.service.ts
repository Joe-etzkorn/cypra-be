import { Message } from '../enums/message.enum';
import RequestedAccount from '../models/requested-account.model';
import User from '../models/user.model';
import { DEFAULT_LIMIT, DEFAULT_PAGE, generateUniqueToken } from '../utils/common';
import { Op } from 'sequelize';
import { EmailService } from './email.service';
import { getStartedTemplate } from '../templates/get-started';
import { Role } from '../enums/role.enum';

interface RequestedAccountsResponse {
  requestedAccounts: RequestedAccount[];
  total: number;
  totalPages: number;
}

interface RequestAccountFilters {
  hasUsedAspire?: boolean;
  requestedDateFrom?: string;
  requestedDateTo?: string;
  searchValue?: string;
}
export class RequestedAccountService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async createRequestAccount(data: {
    name: string;
    companyName: string;
    email: string;
    hasUsedAspire: boolean;
    phone?: string;
    comments?: string;
  }): Promise<RequestedAccount | null> {
    try {
      const existingUser = await User.findOne({
        where: { email: data.email },
      });

      let existingAccount: boolean = false;

      if (existingUser) {
        existingAccount = true;
      }

      const requestedAccount = await RequestedAccount.create({
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        hasUsedAspire: data.hasUsedAspire,
        phone: data.phone,
        comments: data.comments,
        hasExistedAccount: existingAccount,
        userId: existingAccount ? existingUser?.id : null,
        token: null,
      });

      const emailBody = getStartedTemplate({
        name: data.name,
        email: data.email,
        company: data.companyName,
        phone: data.phone,
        comment: data.comments,
      });

      const superAdminUsers = await User.findAll({
        where: { roleId: Role.SUPER_ADMIN },
      });
      
      for (const superAdminUser of superAdminUsers) {
        if (superAdminUser && data.hasUsedAspire) {
          await this.emailService.sendEmail({
            from: process.env.SMTP_MAIL_FROM!,
            to: superAdminUser.email!,
            subject: 'New account request',
            body: emailBody,
          });
        }
      }

      return requestedAccount;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error(Message.ACCOUNT_REQUEST_ALREADY_EXISTS);
      }
      console.error('Error creating requested account:', error);
      throw error;
    }
  }

  async getRequestedAccountsList(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
    filters?: RequestAccountFilters,
  ): Promise<RequestedAccountsResponse> {
    try {
      const offset = (page - 1) * limit;
      const where: any = {};
      const searchCondition: any = {};

      if (filters?.hasUsedAspire !== undefined) {
        where.hasUsedAspire = filters.hasUsedAspire;
      }

      if (filters?.requestedDateFrom && filters?.requestedDateTo) {
        where.createdAt = {
          [Op.between]: [
            new Date(filters.requestedDateFrom),
            new Date(filters.requestedDateTo),
          ],
        };
      } else if (filters?.requestedDateFrom) {
        where.createdAt = {
          [Op.gte]: new Date(filters.requestedDateFrom),
        };
      } else if (filters?.requestedDateTo) {
        where.createdAt = {
          [Op.lte]: new Date(filters.requestedDateTo),
        };
      }

      if (filters?.searchValue) {
        const searchTerm = `%${filters.searchValue}%`;
        where[Op.or] = [
          { name: { [Op.iLike]: searchTerm } },
          { email: { [Op.iLike]: searchTerm } },
          { companyName: { [Op.iLike]: searchTerm } },
        ];
      }

      const { count, rows } = await RequestedAccount.findAndCountAll({
        where: {
          ...where,
          ...searchCondition,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'firstName', 'lastName'],
          },
        ],
        attributes: [
          'id',
          'email',
          'name',
          'companyName',
          'phone',
          'comments',
          'hasUsedAspire',
          'createdAt',
          'token',
          'hasExistedAccount'
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
      });

      return {
        requestedAccounts: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      console.error('Error fetching requested accounts:', error);
      throw error;
    }
  }

  async generateRequestAccountToken(
    requestedAccountId: number,
  ): Promise<RequestedAccount | null> {
    try {
      const requestedAccount =
        await RequestedAccount.findByPk(requestedAccountId);

      if (!requestedAccount) {
        throw new Error(Message.REQUESTED_ACCOUNT_NOT_FOUND);
      }

      const token = generateUniqueToken();

      await requestedAccount.update({ token });

      return requestedAccount;
    } catch (error) {
      console.error('Error generating token for requested account:', error);
      throw error;
    }
  }

  async verifyRequestAccountToken(
    token: string,
  ): Promise<RequestedAccount | null> {
    if (!token) {
      throw new Error(Message.INVALID_TOKEN);
    }

    try {
      const requestedAccount = await RequestedAccount.findOne({
        where: { token },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'firstName', 'lastName'],
          },
        ],
      });

      if (!requestedAccount) {
        throw new Error(Message.INVALID_TOKEN);
      }

      return requestedAccount;
    } catch (error) {
      console.error('Error validating token:', error);
      throw error;
    }
  }
}


