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
