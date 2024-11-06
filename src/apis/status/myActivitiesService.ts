import { axiosInstance } from '../instance/axiosInstance';
import {
  MyActivitiesCheck,
  MyActivitiesRegistrationDashboard,
  MyActivitiesRegistrationSchedule,
  MyActivitiesReservationCheck,
  MyActivitiesUpdateReservationStatus,
} from '@/types/status/myActivitiesType';

class MyActivitiesService {
  getMyActivitiesCheck() {
    return axiosInstance.get<MyActivitiesCheck>(`/my-activities`);
  }

  getMyActivitiesRegistrationDashboard(
    year: string,
    month: string,
    activityId: number,
  ) {
    return axiosInstance.get<MyActivitiesRegistrationDashboard[]>(
      `/my-activities/${activityId}/reservation-dashboard`,
      {
        params: {
          year: year,
          month: month,
        },
      },
    );
  }

  getMyActivitiesRegistrationSchedule(date: string, activityId: number) {
    return axiosInstance.get<MyActivitiesRegistrationSchedule[]>(
      `/my-activities/${activityId}/reserved-schedule`,
      { params: { date: date } },
    );
  }

  getMyActivitiesReservationCheck(
    scheduleId: number,
    status: string,
    activityId: number,
  ) {
    return axiosInstance.get<MyActivitiesReservationCheck>(
      `/my-activities/${activityId}/reservations`,
      { params: { scheduleId: scheduleId, status: status } },
    );
  }

  patchMyActivitiesUpdateReservationStatus(
    activityId: number,
    reservationId: number,
    status: MyActivitiesUpdateReservationStatus,
  ) {
    return axiosInstance.patch<MyActivitiesUpdateReservationStatus>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      status,
    );
  }
}

export default new MyActivitiesService();
