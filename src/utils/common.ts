import { v4 as uuidv4 } from 'uuid';

export const generateUniqueToken = (): string => {
  const token = uuidv4();
  return token;
};
