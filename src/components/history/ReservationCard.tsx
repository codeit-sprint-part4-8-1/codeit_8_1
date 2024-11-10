import { Button } from '../@Shared/Buttons/Button';

interface StatusValue {
  statusColor: string;
  statusText: string;
}

interface ReservationCardProps {
  res: any;
  statusValue: StatusValue;
  handleCancelClick: (id: number) => void;
  handleReviewClick: (res: any) => void;
}

export default function ReservationCard({
  res,
  statusValue,
  handleCancelClick,
  handleReviewClick,
}: ReservationCardProps) {
  const { statusText, statusColor } = statusValue;
  const test = 10000;

  return (
    <div className="flex rounded-3xl overflow-hidden bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
      <div
        className="w-full max-w-32 h-auto sm:max-w-40 sm:h-40 lg:max-w-52 lg:h-52 bg-cover bg-center bg-no-repeat flex-shrink-0 text-[0px] basis-[40%]"
        style={{
          backgroundImage: `url(${
            res.activity.bannerImageUrl || '/image/defaultImage.png'
          })`,
        }}
      >
        이미지 영역
      </div>
      <div className="flex flex-col justify-center w-full basis-[100%] pl-3 p-2 sm:p-4 lg:p-6">
        <span className={`text-sm sm:text-base font-bold ${statusColor}`}>
          {statusText}
        </span>
        <h3 className="text-sm sm:text-lg lg:text-xl font-bold mt-2 mb-3">
          {res.activity.title}
        </h3>
        <span className="text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4">
          {res.date} ・ {res.startTime} - {res.endTime} {res.headCount}명
        </span>
        <div className="flex justify-between items-center">
          <span className="text-[16px] sm:text-xl lg:text-2xl">
            ₩{res.totalPrice.toLocaleString()}
          </span>
          {statusText === '예약 신청' && (
            <>
              <Button
                label="예약 취소"
                variant="line"
                className="w-20 sm:w-28 lg:w-36 h-[32px] sm:h-[40px] lg:h-[44px] text-sm sm:text-[16px]"
                onClick={() => {
                  handleCancelClick(res.id);
                }}
              />
            </>
          )}
          {statusText === '체험 완료' && res.reviewSubmitted === false && (
            <Button
              label="후기 작성"
              variant="solid"
              className="w-20 sm:w-28 lg:w-36 h-[32px] sm:h-[40px] lg:h-[44px] text-sm sm:text-[16px]"
              onClick={() => {
                handleReviewClick(res);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
