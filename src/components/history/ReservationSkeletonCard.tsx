import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ReservationSkeletonCard() {
  return (
    <div className="flex items-center max-h-[208px] rounded-3xl overflow-hidden bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
      <Skeleton
        width={'208px'}
        height={'208px'}
        className="skeleton-line-height"
      />
      <div className="flex flex-col justify-center gap-3 w-full max-h-[208px] p-6">
        <Skeleton width={'20%'} height={'20px'} />
        <Skeleton width={'40%'} height={'20px'} />
        <Skeleton width={'80%'} height={'20px'} />
        <Skeleton width={'30%'} height={'20px'} />
      </div>
    </div>
  );
}
