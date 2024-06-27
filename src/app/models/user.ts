import { BaseEntity } from './base-entity';

export interface User extends BaseEntity {
  name: string;
  username: string;
  email: string;
  profile_image: string;
}

export interface UserPayload {
  name: string;
  username: string;
  email: string;
  password?: string;
}
