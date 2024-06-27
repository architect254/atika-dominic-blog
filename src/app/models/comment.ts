import { Article } from './article';
import { BaseEntity } from './base-entity';

export interface Comment extends BaseEntity {
  article: Article;
  article_id: string;
  content: string;
}

export interface CommentPayload {
  article_id: string;
  content: string;
}
