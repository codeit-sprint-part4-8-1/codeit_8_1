import { updateUserInfo } from '@/apis/myInfo/api';
import { UpdateUserInfo } from '@/types/myPage/type';
import { getValidation } from '@/utils/myInfoValidation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import Confetti from 'react-confetti';

interface MyInfoFormProps {
  nickname: string | undefined;
  email: string | undefined;
}

interface MyInput {
  id: 'nickname' | 'email' | 'password' | 'passwordCheck';
  text: string;
  type: string;
  placeholder: string;
}

export default function MyInfoForm({ nickname, email }: MyInfoFormProps) {
  const [confettiVisible, setConfettiVisible] = useState(false);
  const MY_INPUT_LIST: MyInput[] = [
    {
      id: 'nickname',
      text: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력해주세요.',
    },
    {
      id: 'email',
      text: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요.',
    },
    {
      id: 'password',
      text: '비밀번호',
      type: 'password',
      placeholder: '8자 이상 입력해 주세요',
    },
    {
      id: 'passwordCheck',
      text: '비밀번호 재입력',
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해 주세요',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: nickname || '',
      email: email || '',
      password: '',
      passwordCheck: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: UpdateUserInfo) => {
    const { nickname, password } = data;

    const newPassword = password || undefined;

    try {
      const res = await updateUserInfo(nickname, newPassword);
      toast.success('정보가 수정되었습니다.');
      setConfettiVisible(true);

      setValue('nickname', res.nickname); // 수정된 닉네임 값 적용

      setTimeout(() => {
        setConfettiVisible(false);
      }, 3000);

      setValue('password', '');
      setValue('passwordCheck', '');
    } catch (error) {
      toast.error('정보가 수정에 실패했습니다.');
      console.error(error);
    }
  };

  useEffect(() => {
    setValue('nickname', nickname || '');
    setValue('email', email || '');
  }, [nickname, email]);

  return (
    <div className="w-full max-w-[790px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">내정보</h2>
          <button
            type="submit"
            className="w-32 h-12 bg-nomadBlack text-white rounded disabled:bg-gray-500"
            disabled={!isValid}
          >
            저장하기
          </button>
        </div>
        {MY_INPUT_LIST.map((myInput) => {
          const errorCheck = errors[myInput.id] ? true : false;
          return (
            <div key={myInput.id} className="relative mb-10">
              <label
                htmlFor={myInput.id}
                className="inline-block text-2xl font-bold mb-4"
              >
                {myInput.text}
              </label>
              <input
                id={myInput.id}
                type={myInput.type}
                placeholder={myInput.placeholder}
                className={`border-[1px] border-gray-900 rounded w-full h-14 p-4 focus:outline-green-200 disabled:bg-gray-200 disabled:border-gray-400 ${
                  errorCheck && 'border-red-200'
                }`}
                disabled={myInput.id === 'email' ? true : false}
                {...register(myInput.id, {
                  // 유효성 검사
                  ...getValidation(myInput.id, passwordValue),
                  // 포커스 아웃 시 유효성 검사
                  onBlur: () => {
                    trigger(myInput.id);
                    // 비밀번호가 변경되면 비밀번호 재입력 검증
                    if (myInput.id === 'password') {
                      trigger('passwordCheck');
                    }
                  },
                })}
              />
              {errorCheck && (
                <p className="absolute left-0 bottom-[-25px] text-red-200 text-sm">
                  {String(errors[myInput.id]?.message)}
                </p>
              )}
            </div>
          );
        })}
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              width: '250px',
              height: '60px',
              background: 'green',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          error: {
            style: {
              width: '250px',
              height: '60px',
              background: 'red',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
        }}
      />
      {confettiVisible && <Confetti gravity={0.6} recycle={false} />}
    </div>
  );
}
