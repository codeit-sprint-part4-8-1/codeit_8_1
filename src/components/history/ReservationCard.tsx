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

  return (
    <div className="flex rounded-3xl overflow-hidden bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
      <div
        className="w-52 h-52 bg-cover bg-center bg-no-repeat flex-shrink-0 text-[0px]"
        style={{
          backgroundImage: `url(${
            res.activity.bannerImageUrl || '/image/defaultImage.png'
          })`,
        }}
      >
        이미지 영역
      </div>
      <div className="flex flex-col justify-center gap-3 w-full p-6">
        <span className={`text-base ${statusColor}`}>{statusText}</span>
        <h3 className="text-xl font-bold">{res.activity.title}</h3>
        <span className="text-lg">
          {res.date} ・ {res.startTime} - {res.endTime} {res.headCount}명
        </span>
        <div className="flex justify-between">
          <span className="text-2xl">₩10000</span>
          {statusText === '예약 신청' && (
            <>
              <Button
                label="예약 취소"
                variant="line"
                className="w-36 h-11"
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
              className="w-36 h-11"
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
