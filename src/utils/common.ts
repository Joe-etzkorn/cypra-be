import { v4 as uuidv4 } from 'uuid';

export const generateUniqueToken = (): string => {
  const token = uuidv4();
  return token;
};


export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;