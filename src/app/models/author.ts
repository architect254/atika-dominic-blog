import { BaseEntity } from './base-entity';

export interface Author extends BaseEntity {
  about_title: string;
  about_description: string;
  profile_image: string;
  contact_title: string;
  contact_description: string;
  contact_email: string;
  facebook_profile: string;
  twitter_profile: string;
  youtube_profile: string;
}

export interface AuthorPayload {
  about_title: string;
  about_description: string;
  profile_image: string;
  contact_title: string;
  contact_description: string;
  contact_email: string;
  facebook_profile: string;
  twitter_profile: string;
  youtube_profile: string;
}
