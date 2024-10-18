import React, { useState, useEffect } from 'react';
import Category from '@/components/@Shared/dropDown/Dropdown';

const ExperienceForm = () => {
  const [availableTimes, setAvailableTimes] = useState([
    { date: '', startTime: '', endTime: '' },
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [introImages, setIntroImages] = useState<File[]>([]);

  // 예약 가능한 시간대 추가
  const addAvailableTime = () => {
    setAvailableTimes([
      ...availableTimes,
      { date: '', startTime: '', endTime: '' },
    ]);
  };

  // 예약 가능한 시간대 삭제
  const removeAvailableTime = (index: number) => {
    const updatedTimes = [...availableTimes];
    updatedTimes.splice(index, 1);
    setAvailableTimes(updatedTimes);
  };

  // 시간대 변경
  const handleTimeChange = (index: number, field: string, value: string) => {
    const updatedTimes = [...availableTimes];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setAvailableTimes(updatedTimes);
  };

  // 배너 이미지 업로드
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImages([e.target.files[0]]);
    }
  };

  // 배너 이미지 삭제
  const removeBannerImage = () => {
    setBannerImages([]);
  };

  // 소개 이미지 업로드
  const handleIntroImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (introImages.length + newImages.length <= 4) {
        setIntroImages([...introImages, ...newImages]);
      } else {
        alert('소개 이미지는 최대 4개까지 업로드할 수 있습니다.');
      }
    }
  };

  // 소개 이미지 삭제
  const removeIntroImage = (index: number) => {
    const updatedImages = [...introImages];
    updatedImages.splice(index, 1);
    setIntroImages(updatedImages);
  };

  useEffect(() => {
    // Daum 우편번호 스크립트 동적추가
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcode = () => {
    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress +=
              extraAddress !== ''
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setAddress(fullAddress);
        setPostcode(data.zonecode);
      },
    }).open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, category, description, price, address, postcode });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[796px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 체험 등록</h2>
        <button
          type="submit"
          className="w-[120px] p-2 bg-nomadBlack text-white rounded font-medium"
        >
          등록하기
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">카테고리</label>
        <Category></Category>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[346px] p-2 border border-gray-300 rounded"
          placeholder="설명을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">가격</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="가격을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">우편번호</label>
        <div className="flex">
          <input
            type="text"
            value={postcode}
            readOnly
            className="w-full p-2 border border-gray-300 rounded mr-2"
            placeholder="우편번호"
          />
          <button
            type="button"
            onClick={handlePostcode}
            className="p-2 bg-green-200 text-white rounded w-[15%] hover:bg-green-950"
          >
            찾기
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">주소</label>
        <input
          type="text"
          value={address}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="주소"
        />
      </div>

      {/* 예약 가능한 시간대 */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">예약 가능한 시간대</h3>
        {availableTimes.map((time, index) => (
          <div key={index} className="w-full flex items-center gap-5 mb-4">
            <input
              type="date"
              value={time.date}
              onChange={(e) => handleTimeChange(index, 'date', e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="time"
              value={time.startTime}
              onChange={(e) =>
                handleTimeChange(index, 'startTime', e.target.value)
              }
              className="border p-2 rounded w-1/4"
            />
            ~
            <input
              type="time"
              value={time.endTime}
              onChange={(e) =>
                handleTimeChange(index, 'endTime', e.target.value)
              }
              className="border p-2 rounded w-1/4"
            />
            {index === 0 ? (
              <button
                type="button"
                onClick={addAvailableTime}
                className="text-white text-xl bg-green-200 rounded w-[8%] h-[44px] hover:bg-nomadBlack"
              >
                +
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeAvailableTime(index)}
                className="text-white text-xl bg-red-800 rounded w-[8%] h-[44px]"
              >
                -
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 배너 이미지 */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">배너 이미지</h3>
        <div className="flex gap-4 flex-wrap">
          {/* 이미지 등록 버튼 */}
          <label className="border-dashed border-2 border-gray-300 w-[180px] h-[180px] flex flex-col justify-center items-center rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
              className="hidden"
            />
            <span className="text-gray-500 text-2xl font-semibold">+</span>
            <span className="text-gray-500">이미지 등록</span>
          </label>

          {/* 등록된 배너 이미지 */}
          {bannerImages.length > 0 && (
            <div className="relative w-[180px] h-[180px]">
              <img
                src={URL.createObjectURL(bannerImages[0])}
                alt="배너 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeBannerImage}
                className="absolute top-[-15px] right-[-15px] bg-black text-white rounded-full p-1 opacity-80 w-[40px] h-[40px] text-xl"
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 소개 이미지 */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">소개 이미지</h3>
        <div className="flex gap-4 flex-wrap">
          {/* 이미지 등록 버튼 */}
          <label className="border-dashed border-2 border-gray-300 w-[180px] h-[180px] flex flex-col justify-center items-center rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleIntroImagesChange}
              className="hidden"
            />
            <span className="text-gray-500 text-2xl font-semibold">+</span>
            <span className="text-gray-500">이미지 등록</span>
          </label>

          {/* 등록된 소개 이미지들 */}
          {introImages.map((image, index) => (
            <div key={index} className="relative w-[180px] h-[180px]">
              <img
                src={URL.createObjectURL(image)}
                alt={`소개 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeIntroImage(index)}
                className="absolute top-[-15px] right-[-15px] bg-black text-white rounded-full p-1 opacity-80 w-[40px] h-[40px] text-xl"
              >
                X
              </button>
            </div>
          ))}
        </div>
        {introImages.length >= 4 && (
          <p className="text-red-500 mt-2">
            *소개 이미지는 최대 4개까지만 등록 가능합니다.
          </p>
        )}
      </div>
    </form>
  );
};

export default ExperienceForm;
