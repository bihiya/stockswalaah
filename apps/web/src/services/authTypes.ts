export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface SignupResponse {
  accessToken: string;
  user: AuthUser;
}
