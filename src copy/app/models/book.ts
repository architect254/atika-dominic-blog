import { BaseEntity } from './base-entity';
import { Comment } from './comment';

export interface Book extends BaseEntity {
  title: string;
  description: string;
  themes: string;
  image: string;
  cost: number;
}
export interface BookPayload {
  title: string;
  description: string;
  themes: string;
  cost: number;
}
