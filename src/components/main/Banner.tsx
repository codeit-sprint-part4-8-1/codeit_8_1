import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const slides = [
  {
    image: '/image/mainBanner01.png',
    title: '함께 배우면 즐거운\n스트릿 댄스',
    subtitle: '1월의 인기체험 BEST 🔥',
  },
  {
    image: '/image/mainBanner02.png',
    title: '연인과 사랑의\n징검 다리 건너기',
    subtitle: '10월의 인기체험 BEST 🔥',
  },
  {
    image: '/image/mainBanner03.png',
    title: '부모님과 함께\n갈대숲 체험',
    subtitle: '11월의 인기체험 BEST 🔥',
  },
];

export default function Banner() {
  const [fadeClass, setFadeClass] = useState('animate-fadeIn');
  const [bgAnimationClass, setBgAnimationClass] = useState(
    'animate-backgroundMove',
  );

  const handleSlideChange = () => {
    setFadeClass('animate-fadeOut');
    setBgAnimationClass('');

    setTimeout(() => {
      setFadeClass('animate-fadeIn');
      setBgAnimationClass('animate-backgroundMove');
    }, 400); // fadeOut과 맞추기
  };

  const handleResize = () => {
    setFadeClass('animate-fadeIn');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fadeClass]);

  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      loop={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Autoplay]}
      onSlideChange={handleSlideChange}
      className="w-full h-[240px] sm:h-[550px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className={`relative w-full h-full bg-no-repeat bg-cover bg-center ${bgAnimationClass}`}
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        >
          <div className="absolute w-full h-full bg-main-banner opacity-100" />
          <div
            className={`relative container flex flex-col justify-center w-full mx-auto h-full px-4 text-white ${fadeClass}`}
          >
            <h2
              className={`text-2xl sm:text-5xl md:text-7xl font-bold sm:leading-tight md:leading-tight mb-3 sm:mb-5 `}
            >
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <span className={`text-base sm:text-xl md:text-2xl font-bold`}>
              {slide.subtitle}
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
