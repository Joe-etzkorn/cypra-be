import { Message } from '../enums/message.enum';
import RequestedAccount from '../models/requestedAccount.model';
import User from '../models/user.model';

export const createRequestAccount = async (data: {
  name: string;
  companyName: string;
  email: string;
  hasUsedAspire: boolean;
  phone?: string;
  comments?: string;
}): Promise<RequestedAccount | null> => {
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

    return requestedAccount;
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(Message.ACCOUNT_REQUEST_ALREADY_EXISTS);
    }
    console.error('Error creating requested account:', error);
    throw error;
  }
};
