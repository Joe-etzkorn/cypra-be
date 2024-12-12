import { Request } from 'express';
import User from '../models/user.model';

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  clientId: string;
  clientSecret: string;
}

export interface UpdateUserInput {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CognitoUser {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  dbUser: User;
}

export interface AdminAuthenticatedRequest extends Request {
  user?: CognitoUser;
}