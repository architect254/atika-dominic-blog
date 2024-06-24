export interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author: string;
  upvotes: number;
  date_created: Date;
  date_updated: Date;
  row_span: number;
  col_span: number;
}
