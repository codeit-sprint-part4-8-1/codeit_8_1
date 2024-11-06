import React from 'react';
import Link from 'next/link';
import { ActivityCardProps } from '../../types/mainPage/ActivityCardTypes';

export const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  image,
  rating,
  reviews,
  title,
  price,
}) => {
  return (
    <Link href={`/activity/${id}`} passHref>
      <div className="w-full max-w-sm rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
        <div className="w-full h-40 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-3">
          <div className="flex items-center text-black text-left">
            <span className="mr-1">⭐</span>
            <span>{rating}</span>
            <span className="ml-1 text-gray-500">({reviews})</span>
          </div>
          <h3 className="mt-2 mb-1 text-lg font-semibold text-black text-left">
            {title}
          </h3>
          <p className="font-semibold text-black text-base text-left flex items-center whitespace-nowrap">
            <span>₩ {price.toLocaleString()}</span>
            <span className="font-light ml-1">/ 인</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .max-w-xs {
            max-height: 293px; /* Mobile */
          }
        }
        @media (min-width: 768px) and (max-width: 1279px) {
          .max-w-xs {
            max-height: 373px; /* Tablet */
          }
        }
        @media (min-width: 1280px) {
          .max-w-xs {
            max-height: 435px; /* PC */
          }
        }
      `}</style>
    </Link>
  );
};
