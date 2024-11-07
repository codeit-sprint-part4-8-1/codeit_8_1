export const reservationValidation = (status: string) => {
  let statusText;
  let statusColor;

  switch (status) {
    case 'pending':
      statusText = '예약 신청';
      statusColor = 'text-blue-300';
      break;
    case 'confirmed':
      statusText = '예약 승인';
      statusColor = 'text-orange-200';
      break;
    case 'declined':
      statusText = '예약 거절';
      statusColor = 'text-red-200';
      break;
    case 'canceled':
      statusText = '예약 취소';
      statusColor = 'text-gray-900';
      break;
    case 'completed':
      statusText = '체험 완료';
      statusColor = 'text-gray-900';
      break;
    default:
      statusText = '상태 불명';
      statusColor = 'text-red-200';
  }
  return { statusText, statusColor };
};
