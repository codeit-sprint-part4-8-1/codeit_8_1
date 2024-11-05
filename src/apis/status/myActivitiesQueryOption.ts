import myActivitiesService from './myActivitiesService';
import { MyActivitiesUpdateReservationStatus } from '@/types/status/myActivitiesType';

const queryOptions = {
  myActivitiesCheck: {
    queryKey: ['myActivitiesCheck'],
    queryFn: () => myActivitiesService.getMyActivitiesCheck(),
    staleTime: 3 * 60 * 1000,
  },
  myActivitiesRegistrationDashboard: (
    year: string,
    month: string,
    activityId: number,
  ) => ({
    queryKey: ['myActivitiesRegistrationDashboard', 'activityId'],
    queryFn: () =>
      myActivitiesService.getMyActivitiesRegistrationDashboard(
        year,
        month,
        activityId,
      ),
    staleTime: 3 * 60 * 1000,
  }),
  myActivitiesRegistrationSchedule: (date: string, activityId: number) => ({
    queryKey: ['myActivitiesRegistrationSchedule', 'activityId'],
    queryFn: () =>
      myActivitiesService.getMyActivitiesRegistrationSchedule(date, activityId),
    staleTime: 3 * 60 * 1000,
  }),
  myActivitiesReservationCheck: (
    scheduleId: number,
    status: string,
    activityId: number,
  ) => ({
    queryKey: ['myActivitiesReservationCheck', 'activityId'],
    queryFn: () =>
      myActivitiesService.getMyActivitiesReservationCheck(
        scheduleId,
        status,
        activityId,
      ),
    staleTime: 3 * 60 * 1000,
  }),
  myActivitiesUpdateReservationStatus: (
    activityId: number,
    reservationId: number,
  ) => ({
    mutationKey: [
      'myActivitiesUpdateReservationStatus',
      'activityId',
      'reservationId',
    ],
    mutationFn: (status: MyActivitiesUpdateReservationStatus) =>
      myActivitiesService.patchMyActivitiesUpdateReservationStatus(
        activityId,
        reservationId,
        status,
      ),
    staleTime: 3 * 60 * 1000,
  }),
};

export default queryOptions;
