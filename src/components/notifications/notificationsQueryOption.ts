import MyNotificationsService from './notificationsService';

const queryOptions = {
  myNotificationsCheck: {
    queryKey: ['myNotificationsCheck'],
    queryFn: () => MyNotificationsService.getMyNotificationsCheck(),
    staleTime: 3 * 60 * 1000,
  },
  deleteMyNotifications: () => ({
    mutationKey: ['deleteMyNotifications', 'notificationsId'],
    mutationFn: (notificationsId: number) =>
      MyNotificationsService.deleteMyNotifications(notificationsId),
    staleTime: 3 * 60 * 1000,
  }),
};

export default queryOptions;
