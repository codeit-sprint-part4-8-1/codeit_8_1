export interface signUpFormData {
  email:string;
  nickname: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export interface signUpFormDataWithRepeat extends signUpFormData {
  'password-repeat' : string;
}