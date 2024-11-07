import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from './myActivitiesQueryOption';

export const useMyActivitiesCheck = () => {
  return useQuery(queryOptions.myActivitiesCheck);
};

export const useMyActivitiesRegistrationDashboard = (
  year: string,
  month: string,
  activityId: number,
) => {
  return useQuery(
    queryOptions.myActivitiesRegistrationDashboard(year, month, activityId),
  );
};

export const useMyActivitiesRegistrationSchedule = (
  date: string,
  activityId: number,
) => {
  return useQuery(
    queryOptions.myActivitiesRegistrationSchedule(date, activityId),
  );
};

export const useMyActivitiesReservationCheck = (
  scheduleId: number,
  status: string,
  activityId: number,
) => {
  return useQuery(
    queryOptions.myActivitiesReservationCheck(scheduleId, status, activityId),
  );
};

export const useMyActivitiesUpdateReservationStatus = (
  activityId: number,
  reservationId: number,
) => {
  return useMutation(
    queryOptions.myActivitiesUpdateReservationStatus(activityId, reservationId),
  );
};
