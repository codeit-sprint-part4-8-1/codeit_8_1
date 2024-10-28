export interface signUpFormData {
  email:string;
  nickname: string;
  password: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export interface signUpFormDataWithRepeat extends signUpFormData {
  'password-repeat' : string;
}