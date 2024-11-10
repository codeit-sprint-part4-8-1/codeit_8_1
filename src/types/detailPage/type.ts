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

export interface ActivityId {
  activityId: number;
}
export interface FetchActivityIdReview {
  activityId: number;
  page?: number;
  size?: number;
}

export interface PostActivityIdReserve {
  activityId: number;
  scheduleId: number;
  headCount: number;
}

export interface FetchReserveCheck {
  activityId: number;
  year: string;
  month: string;
}
