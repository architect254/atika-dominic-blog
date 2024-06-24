export interface SignUpPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}
