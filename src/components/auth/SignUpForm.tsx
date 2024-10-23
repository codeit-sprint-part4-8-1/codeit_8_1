import { FC, useState } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import { useForm } from 'react-hook-form';
import { signUpFormData, signUpFormDataWithRepeat } from './AuthDtos';
import AuthInput from './AuthInput';
import clsx from 'clsx';
import createValidations from './Validations';
import { axiosInstance } from '@/apis/instance/axiosInstance';
import { useRouter } from 'next/router'; // useRouter import 추가
import Modal from './modal';
import axios from 'axios';

const SignUpForm: FC = () => {
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<signUpFormData>({ mode: 'onBlur' });
  const [ isButtonValid, setIsButtonValid ] = useState<boolean>(false);
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ modalMessage, setModalMessage ] = useState<string>('');
  const [ isLoginSuccess, setIsLoginSuccess ] = useState<boolean>(true);

  const router = useRouter();

  const Validations = createValidations(watch('password'));

  const handleBlur = async (name: keyof Partial<signUpFormDataWithRepeat>) => {
    const result = await trigger(name as any); 
    const allFieldsFilled = Object.values(watch()).every(value => value !== ""); 
    setIsButtonValid(result && allFieldsFilled);
  };

  const onSubmit = async (data: signUpFormData) => {
    try {
      const response = await axiosInstance.post('/users', data); 
      setIsLoginSuccess(true);
      setModalMessage(`회원가입 성공`);
      setModalOpen(true);
     
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(`error : `)
        console.log(error.response?.data.message);
        setIsLoginSuccess(false);
        setModalMessage(error.response?.data.message);
        setModalOpen(true);
      }
    }
  }

  const modalClose = (type : string, isLoginSuccess : boolean )=> {
    setModalOpen(false);
    if(isLoginSuccess) {
      if(type === 'login') router.push('/');
      if(type === 'signUp') router.push('/login');
    }
  }
  return (
    <>

    <Modal isOpen={modalOpen} onClose={()=>modalClose('signUp', isLoginSuccess) } message={modalMessage} />
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mt-6 flex flex-col justify-center align-center gap-7',
        'w-full',
      )}
    >
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} errors={errors} onBlur={() => handleBlur('email')} />
      <AuthInput label="닉네임" register={register} name="nickname" validation={Validations.nickname} errors={errors} onBlur={() => handleBlur('nickname')} />
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} errors={errors} onBlur={() => handleBlur('password')} />
      <AuthInput label="비밀번호 확인" register={register} name="password-repeat" validation={Validations.passwordRepeat} errors={errors} onBlur={() => handleBlur('password-repeat')} />
      <Button variant="solid" label="회원가입 하기" type="submit" disabled={!isButtonValid} className="h-[48px]" />
    </form>
    </>
  );
};

export default SignUpForm;
