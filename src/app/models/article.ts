import { BaseEntity } from './base-entity';
import { Comment } from './comment';

export interface Article extends BaseEntity {
  title: string;
  description: string;
  keywords:string;
  article_image: string;
  content: string;
  comments: Comment[];
}
export interface ArticlePayload {
  title: string;
  description:string;
  keywords:string;
  article_image: string;
  content: string;
}
