import { axiosInstance } from '../instance/axiosInstance';

interface ActivityId {
  activityId: number;
}

export const fetchActivityIdPreview = async ({ activityId }: ActivityId) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}`);
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
