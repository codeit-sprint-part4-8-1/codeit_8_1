import {
  ActivityId,
  FetchActivityIdReview,
  FetchReserveCheck,
  PostActivityIdReserve,
} from '@/types/detailPage/type';
import { axiosInstance } from '../instance/axiosInstance';
import { P } from 'ts-pattern';

export const fetchActivityIdPreview = async ({ activityId }: ActivityId) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchActivityIdReview = async ({
  activityId,
  page = 1,
  size = 3,
}: FetchActivityIdReview) => {
  try {
    const query = `/activities/${activityId}/reviews?page=${page}&size${size}`;
    const response = await axiosInstance.get(query);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteActivityId = async ({ activityId }: ActivityId) => {
  try {
    const response = await axiosInstance.delete(`/my-activities/${activityId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const modifyActivityId = async ({ activityId }: ActivityId) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postActivityIdReserve = async ({
  activityId,
  scheduleId,
  headCount = 1,
}: PostActivityIdReserve) => {
  try {
    const response = await axiosInstance.post(
      `/activities/${activityId}/reservations`,
      {
        scheduleId,
        headCount,
      },
    );
    return response;
  } catch (error: any) {
    console.error('에러 확인', error);
    return error.response;
  }
};

export const fetchReserveCheck = async ({
  activityId,
  year,
  month,
}: FetchReserveCheck) => {
  try {
    const query = `/activities/${activityId}/available-schedule?year=${year}&month=${month}`;
    const response = await axiosInstance.get(query);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
