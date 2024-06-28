import { User } from './user';

export interface SignUpPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface JwtPayload {
  user: User;
}
