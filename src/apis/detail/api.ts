import { axiosInstance } from '../instance/axiosInstance';

interface ActivityId {
  activityId: number;
}
interface fetchActivityIdReviewProps {
  activityId: number;
  page?: number;
  size?: number;
}

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
}: fetchActivityIdReviewProps) => {
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
