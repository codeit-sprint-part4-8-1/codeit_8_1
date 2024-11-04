import React, { useRef, useState } from 'react';
import HotActivityCard from './HotActivityCard';
import { hotActivities } from './HotActivityListData';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const HotActivityList: React.FC = () => {
  const swiperRef = useRef<any>(null); // Swiper 인스턴스를 위한 ref
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // 한 번에 보여줄 카드 개수

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="mobile:w-[388px] tablet2:w-[800px] pc:w-[1200px] overflow-visible">
      <div className="relative flex flex-col items-center w-full">
        <span className="flex flex-row justify-between w-full mb-[16px]">
          <h2 className="mobile:text-2lg tablet:text-4xl text-black text-left font-semibold">
            🔥 인기 체험
          </h2>
          <span className="flex flex-row">
            <button
              onClick={handlePrevClick}
              disabled={currentIndex === 0}
              className="hidden md:block"
            >
              <img
                src={
                  currentIndex > 0
                    ? '/ico/ico_arrow_left_active.svg'
                    : '/ico/ico_arrow_left_inactive.svg'
                }
                alt="이전"
              />
            </button>
            <button
              onClick={handleNextClick}
              disabled={currentIndex >= hotActivities.length - itemsPerPage}
              className="hidden md:block"
            >
              <img
                src={
                  currentIndex < hotActivities.length - itemsPerPage
                    ? '/ico/ico_arrow_right_active.svg'
                    : '/ico/ico_arrow_right_inactive.svg'
                }
                alt="다음"
              />
            </button>
          </span>
        </span>

        <Swiper
          ref={swiperRef} // Swiper 인스턴스를 참조
          modules={[Pagination]}
          style={{ width: '100%', height: 'auto' }}
          spaceBetween={16}
          slidesPerView={itemsPerPage}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);
          }}
          breakpoints={{
            375: {
              slidesPerView: itemsPerPage, // 화면 크기에 따라 자동으로 조정
            },
            768: {
              slidesPerView: itemsPerPage,
            },
            1280: {
              slidesPerView: itemsPerPage,
            },
          }}
        >
          {hotActivities.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ width: 'auto' }}
              className="!flex-shrink-0"
            >
              <HotActivityCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HotActivityList;
