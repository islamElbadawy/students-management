export enum Role {
  Admin = 'admin',
  User = 'user',
}

type User = {
  id: string;
  username: string;
  password: string;
  role: Role;
};

export interface IAuthenticate {
  user: User;
  token: string;
}
