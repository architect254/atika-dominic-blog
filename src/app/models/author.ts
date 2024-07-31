import { BaseEntity } from './base-entity';

export interface Author extends BaseEntity {
  nickname: string;
  education: string;
  interests: string;
  accomplishments: string;
  expertise: string;
  residence: string;
  about_info: string;
  facebook_profile: string;
  twitter_profile: string;
  whatsapp_profile: string;
}

export interface AuthorPayload {
  nickname: string;
  education: string;
  interests: string;
  accomplishments: string;
  expertise: string;
  residence: string;
  about_info: string;
  facebook_profile: string;
  twitter_profile: string;
  whatsapp_profile: string;
}
