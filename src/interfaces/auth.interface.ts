export interface IAuthUser {
  id: string;
  email: string;
  fullName: string;
}

export interface IAuthSession {
  user: IAuthUser;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  fullName: string;
  password: string;
}
