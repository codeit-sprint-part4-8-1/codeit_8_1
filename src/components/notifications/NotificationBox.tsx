import Image from 'next/image';
import CloseButton from '/public/ico/ico_smallClose.svg';
import CloseButton_gray from '/public/ico/ico_smallCloseGray.svg';
import BlueDot from '/public/ico/ico_blueDot.svg';
import RedDot from '/public/ico/ico_redDot.svg';
import {
  useDeleteMyNotifications,
  useMyNotificationsCheck,
} from './useNotificationsService';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface NotificationBoxProps {
  onClose: () => void;
}

const NotificationBox = ({ onClose }: NotificationBoxProps) => {
  const [notificationId, setNotificationId] = useState<number>(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data: notifications } = useMyNotificationsCheck();
  const { mutate: deleteNotification } = useDeleteMyNotifications();

  const handleDeleteNotification = (id: number) => {
    setNotificationId(id);
    deleteNotification(id, {
      onSuccess: () => {
        console.log('삭제 성공');
        queryClient.invalidateQueries({ queryKey: ['myNotificationsCheck'] });
      },
      onError: (error) => {
        console.error('삭제 실패', error);
      },
    });
    console.log(id);
  };

  const displayCreateAt = (createdAt: string) => {
    const updatedDate = new Date(createdAt).getTime();
    const now = Date.now();
    const milliSeconds = now - updatedDate;

    const seconds = milliSeconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;

    if (seconds < 60) {
      return '방금 전';
    } else if (minutes < 60) {
      return `${Math.floor(minutes)}분 전`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}시간 전`;
    } else if (days < 30) {
      return `${Math.floor(days)}일 전`;
    } else if (months < 12) {
      return `${Math.floor(months)}달 전`;
    } else {
      return `${Math.floor(years)}년 전`;
    }
  };

  const renderContentWithStyles = (content: string) => {
    if (content.includes('승인')) {
      return (
        <>
          {content.split('승인')[0]}
          <span className="text-blue-200">승인</span>
          {content.split('승인')[1]}
        </>
      );
    } else if (content.includes('거절')) {
      return (
        <>
          {content.split('거절')[0]}
          <span className="text-red-200">거절</span>
          {content.split('거절')[1]}
        </>
      );
    }
    return content;
  };

  const renderDot = (content: string) => {
    if (content.includes('승인')) {
      return (
        <>
          <Image
            src={BlueDot}
            alt="status-confirmed"
            width={5}
            height={5}
            priority
          />
        </>
      );
    } else if (content.includes('거절')) {
      return (
        <>
          <Image
            src={RedDot}
            alt="status-declined"
            width={5}
            height={5}
            priority
          />
        </>
      );
    }
    return content;
  };

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  if (!notifications) return null;

  return (
    <div
      className="absolute right-24 top-14 z-50 mt-3 flex w-80 flex-col gap-4 rounded-[10px] bg-green-100 px-5 py-6 shadow-[0_2px_8px_0_#787486]"
      ref={notificationRef}
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">
          알림 {notifications.data.totalCount}개
        </div>
        <div>
          <Image
            src={CloseButton}
            alt="close-notificationBox"
            width={24}
            height={24}
            priority
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.data.notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col gap-1 rounded-[5px] border border-gray-400 bg-white px-3 py-4"
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                {renderDot(notification.content)}
              </div>
              <Image
                src={CloseButton_gray}
                alt="delete-notification"
                width={24}
                height={24}
                priority
                onClick={() => handleDeleteNotification(notification.id)}
                className="cursor-pointer"
              />
            </div>
            <div className="text-sm font-normal">
              {renderContentWithStyles(notification.content)}
            </div>
            <div className="text-xs font-normal text-gray-600">
              {displayCreateAt(notification.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBox;
