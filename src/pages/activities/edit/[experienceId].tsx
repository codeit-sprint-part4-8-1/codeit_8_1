import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditExperience = () => {
  const [token, setToken] = useState('');
  const [experienceData, setExperienceData] = useState({
    title: '',
    category: '',
    description: '',
    price: 0,
  });
  const [availableTimes, setAvailableTimes] = useState([
    { id: null, date: '', startTime: '', endTime: '' },
  ]);
  const [deletedScheduleIds, setDeletedScheduleIds] = useState([]);
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [subImageUrls, setSubImageUrls] = useState([]);
  const [deletedSubImageIds, setDeletedSubImageIds] = useState([]);

  const router = useRouter();
  const { experienceId } = router.query;

  const removeSubImage = (index: number) => {
    const updatedSubImageUrls = [...subImageUrls];
    const removedImage = updatedSubImageUrls[index];
    if (removedImage.id) {
      setDeletedSubImageIds((prev) => [...prev, removedImage.id]);
    }
    updatedSubImageUrls.splice(index, 1);
    setSubImageUrls(updatedSubImageUrls);
  };

  const addAvailableTime = () => {
    setAvailableTimes([
      ...availableTimes,
      { id: null, date: '', startTime: '', endTime: '' },
    ]);
  };

  const removeAvailableTime = (index: number) => {
    const updatedTimes = [...availableTimes];
    const removedTime = updatedTimes[index];
    if (removedTime.id) {
      setDeletedScheduleIds((prev) => [...prev, removedTime.id]);
    }
    updatedTimes.splice(index, 1);
    setAvailableTimes(updatedTimes);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
      return;
    }
    setToken(storedToken);

    const storedExperience = localStorage.getItem('selectedExperience');
    if (storedExperience) {
      const parsedData = JSON.parse(storedExperience);
      setExperienceData(parsedData);
      setAvailableTimes(
        parsedData.schedules?.map((schedule) => ({
          ...schedule,
          id: schedule.id,
        })) || [{ id: null, date: '', startTime: '', endTime: '' }],
      );
      setBannerImageUrl(parsedData.bannerImageUrl || '');
      setSubImageUrls(
        parsedData.subImages?.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
        })) || [],
      );
    } else {
      console.error('체험 정보가 존재하지 않습니다.');
      router.push('/activities');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (index: number, field: string, value: string) => {
    const updatedTimes = [...availableTimes];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setAvailableTimes(updatedTimes);
  };

  const handleBannerImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post(
          'https://sp-globalnomad-api.vercel.app/8-1/activities/image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBannerImageUrl(response.data.activityImageUrl);
      } catch (error) {
        console.error('배너 이미지 업로드에 실패했습니다:', error);
      }
    }
  };

  const handleSubImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const promises = files.map(async (file) => {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const response = await axios.post(
            'https://sp-globalnomad-api.vercel.app/8-1/activities/image',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          return {
            id: null,
            imageUrl: response.data.activityImageUrl,
          };
        } catch (error) {
          console.error('추가 이미지 업로드에 실패했습니다:', error);
          return null;
        }
      });
      const newSubImageUrls = await Promise.all(promises);
      setSubImageUrls((prevImages) => [
        ...prevImages,
        ...newSubImageUrls.filter(Boolean),
      ]);
    }
  };

  const handleSave = async () => {
    if (!experienceId) {
      console.error('experienceId가 누락되었습니다.');
      return;
    }

    const dataToSave = {
      title: experienceData.title,
      category: experienceData.category,
      description: experienceData.description,
      price: Number(experienceData.price),
      bannerImageUrl: bannerImageUrl,
      subImageUrlsToAdd: subImageUrls
        .filter((image) => !image.id)
        .map((image) => image.imageUrl),
      subImageIdsToRemove: deletedSubImageIds,
      scheduleIdsToRemove: deletedScheduleIds,
      schedulesToAdd: availableTimes
        .filter((time) => !time.id)
        .map((time) => ({
          date: time.date,
          startTime: time.startTime,
          endTime: time.endTime,
        })),
    };

    try {
      const response = await axios.patch(
        `https://sp-globalnomad-api.vercel.app/8-1/my-activities/${experienceId}`,
        dataToSave,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert('체험 정보가 성공적으로 수정되었습니다.');
        router.push(`/activities/detail`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/login');
        return;
      }
      console.error('체험 정보를 저장하는데 실패했습니다:', error);
      alert('체험 정보 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-[796px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">체험 수정</h2>
        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="w-[120px] p-2 bg-nomadBlack text-white rounded font-medium"
        >
          저장하기
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">제목</label>
        <input
          type="text"
          name="title"
          value={experienceData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">카테고리</label>
        <input
          type="text"
          name="category"
          value={experienceData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="카테고리를 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">설명</label>
        <textarea
          name="description"
          value={experienceData.description}
          onChange={handleChange}
          className="w-full h-[346px] p-2 border border-gray-300 rounded"
          placeholder="설명을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">가격</label>
        <input
          type="number"
          name="price"
          value={experienceData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="가격을 입력하세요"
        />
      </div>

      <div className="my-6">
        <h3 className="block text-lg font-semibold mb-2">예약 가능한 시간대</h3>
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

      <div className="my-6">
        <h3 className="block text-lg font-semibold mb-2">배너 이미지</h3>
        <div className="flex gap-4 flex-wrap">
          {bannerImageUrl && (
            <div className="relative w-[180px] h-[180px]">
              <img
                src={bannerImageUrl}
                alt="배너 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <label className="border-dashed border-2 border-gray-300 w-[180px] h-[180px] flex flex-col justify-center items-center rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
              className="hidden"
            />
            <span className="text-gray-500 text-2xl font-semibold">+</span>
            <span className="text-gray-500">배너 이미지 변경</span>
          </label>
        </div>
      </div>

      <div className="my-6">
        <h3 className="block text-lg font-semibold mb-2">추가 이미지</h3>
        <div className="flex gap-4 flex-wrap">
          {subImageUrls.map((image, index) => (
            <div key={index} className="relative w-[180px] h-[180px]">
              <img
                src={image.imageUrl}
                alt={`추가 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeSubImage(index)}
                className="absolute top-[-15px] right-[-15px] bg-black text-white rounded-full p-1 opacity-80 w-[40px] h-[40px] text-xl"
              >
                X
              </button>
            </div>
          ))}
          <label className="border-dashed border-2 border-gray-300 w-[180px] h-[180px] flex flex-col justify-center items-center rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleSubImagesChange}
              multiple
              className="hidden"
            />
            <span className="text-gray-500 text-2xl font-semibold">+</span>
            <span className="text-gray-500">추가 이미지 변경</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;
