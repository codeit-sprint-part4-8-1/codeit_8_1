import React from 'react';
import Link from 'next/link';
import { HotActivityCardProps } from '@/types/mainPage/HotActivityCardTypes';

const HotActivityCard: React.FC<HotActivityCardProps> = ({
  id,
  image,
  rating,
  reviews,
  title,
  price,
}) => {
  return (
    <Link href={`/activity/${id}`} passHref>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="relative bg-cover bg-center mobile:h-[186px] tablet:h-[384px] mobile:w-[186px] tablet:w-[384px] max-w-sm rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
      >
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center text-white text-left">
            <span className="mr-1">⭐</span>
            <span>{rating}</span>
            <span className="ml-1 text-white">({reviews})</span>
          </div>
          <h3 className="mt-2 mb-1 text-lg font-semibold text-white text-left">
            {title}
          </h3>
          <p className="font-semibold text-white text-base text-left flex items-center whitespace-nowrap">
            <span>₩ {price.toLocaleString()}</span>
            <span className="font-light ml-1">/ 인</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotActivityCard;
