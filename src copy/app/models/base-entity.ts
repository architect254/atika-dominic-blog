import { User } from './user';

export interface BaseEntity {
  id: string;
  create_date?: Date;
  update_date?: Date;
  creator: User;
  creator_id: string;
  updator: User;
  updator_id: string;
}
