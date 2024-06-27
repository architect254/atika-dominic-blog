import { BaseEntity } from './base-entity';
import { Comment } from './comment';

export interface Article extends BaseEntity {
  title: string;
  summary: string;
  keywords:string;
  header_image: string;
  content: string;
  row_span: number;
  col_span: number;
  comments: Comment[];
}
export interface ArticlePayload {
  title: string;
  summary:string;
  keywords:string;
  content: string;
  row_span: number;
  col_span: number;
}
