import { axiosInstance } from '@/apis/instance/axiosInstance';
import {
  MyNotificationsCheck,
  deleteMyNotifications,
} from './notificationsType';

class MyNotificationsService {
  getMyNotificationsCheck() {
    return axiosInstance.get<MyNotificationsCheck>(`/my-notifications`);
  }

  deleteMyNotifications(notificationsId: number) {
    return axiosInstance.delete(`/my-notifications/${notificationsId}`);
  }
}

export default new MyNotificationsService();
