export interface MyPageProfileMenu {
  name: string;
  link?: string;
  defaultImage: string;
  activeImage: string;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInfo {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
}
