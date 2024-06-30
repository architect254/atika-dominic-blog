export const STORAGE_KEYS = {
  ACCESS_TOKEN: `access-token`,
};

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface AuthorPayload {
  id?: string;
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
