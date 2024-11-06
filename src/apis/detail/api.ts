import { axiosInstance } from '../instance/axiosInstance';

interface fetchActivityIdReviewProps {
  activityId: number;
  page?: number;
  size?: number;
}

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
