//내 알림 리스트 조회
export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedat: string;
}

export interface MyNotificationsCheck {
  totalCount: number;
  notifications: Notification[];
  cursorId: number | null;
}

//내 알림 삭제
export interface deleteMyNotifications {
  notificationId: string;
}
