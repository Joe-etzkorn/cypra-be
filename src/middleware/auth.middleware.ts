import { Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { AwsRole } from '../enums/role.enum';
import { CognitoUser } from '../interfaces/user.interface';

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
  // credentials: new AWS.Credentials(
  //   process.env.AWS_ACCESS_KEY_ID!,
  //   process.env.AWS_SECRET_ACCESS_KEY!,
  //   process.env.AWS_SESSION_TOKEN,
  // ),
});

interface AuthenticatedRequest extends Request {
  user?: string | object;
}

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  role: AwsRole[],
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    sendResponse(res, 401, false, Message.UNAUTHORIZED);
    return;
  }

  try {
    const params = {
      AccessToken: token,
    };

    const userData = await cognito.getUser(params).promise();

    const groupParams = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: userData.Username,
    };
    const groupData = await cognito
      .adminListGroupsForUser(groupParams)
      .promise();
    const userGroup = groupData.Groups?.find(
      (group) => role.includes(group.GroupName as AwsRole),
    );
    if (!userGroup) {
      sendResponse(res, 401, false, Message.UNAUTHORIZED);
      return;
    }
    const userAttributes = userData.UserAttributes?.reduce((acc: any, attr) => {
      acc[attr.Name] = attr.Value;
      return acc;
    }, {});

    req.user = {
      sub: userAttributes['sub'],
      email: userAttributes['email'],
      given_name: userAttributes['given_name'],
      family_name: userAttributes['family_name'],
    } as CognitoUser;

    next();
  } catch (error: any) {
    console.error('Token verification failed:', error);

    if (error.code === 'NotAuthorizedException') {
      sendResponse(res, 401, false, Message.UNAUTHORIZED);
      return;
    }

    sendResponse(res, 500, false, Message.COMMON_ERROR);
  }
};

export const SuperAdminAuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => authenticateUser(req, res, next, [AwsRole.SUPER_ADMIN]);

export const AdminAuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => authenticateUser(req, res, next, [AwsRole.ADMIN, AwsRole.USER]);
