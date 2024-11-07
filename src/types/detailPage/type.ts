export interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubImages {
  id: number;
  imageUrl: string;
}

export interface Detail {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: Schedules[];
  subImages: SubImages[];
  title: string;
  updateAt: string;
  userId: number;
}
