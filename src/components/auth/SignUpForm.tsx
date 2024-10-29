import { FC, useState } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import { useForm } from 'react-hook-form';
import { signUpFormData, signUpFormDataWithRepeat } from './AuthDtos';
import AuthInput from './AuthInput';
import clsx from 'clsx';
import createValidations from './Validations';
import { axiosInstance } from '@/apis/instance/axiosInstance';
import Modal from './Modal';
import axios from 'axios';
import useModalClose from './modalClose';

const SignUpForm: FC = () => {
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<signUpFormData>({ mode: 'onBlur' });
  const [ isButtonValid, setIsButtonValid ] = useState<boolean>(false);
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ modalMessage, setModalMessage ] = useState<string>('');
  const [ isSignUpSuccess, setIsSignUpSuccess ] = useState<boolean>(true);

  const modalClose = useModalClose();
  const Validations = createValidations(watch('password'));

  const handleBlur = async (name: keyof Partial<signUpFormDataWithRepeat>) => {
    const result = await trigger(name as any); 
    const allFieldsFilled = Object.values(watch()).every(value => value !== ""); 
    setIsButtonValid(result && allFieldsFilled);
  };

  const onSubmit = async (data: signUpFormData) => {
    try {
      const response = await axiosInstance.post('/users', data);
      console.log(response.data);
      setIsSignUpSuccess(true);
      setModalMessage(`회원가입 성공`);
      setModalOpen(true);
     
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(`error : `)
        console.log(error.response?.data.message);
        setIsSignUpSuccess(false);
        setModalMessage(error.response?.data.message);
        setModalOpen(true);
      }
    }
  }

  return (
    <>
    <Modal isOpen={modalOpen} onClose={()=>modalClose({type : 'signUp', isSuccess :isSignUpSuccess, setModalOpen}) } message={modalMessage} />
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mt-6 flex flex-col justify-center align-center gap-7',
        'w-full',
      )}
    >
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} errors={errors} onBlur={() => handleBlur('email')} type='email' />
      <AuthInput label="닉네임" register={register} name="nickname" validation={Validations.nickname} errors={errors} onBlur={() => handleBlur('nickname')} type='text' />
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} errors={errors} onBlur={() => handleBlur('password')} type='password' />
      <AuthInput label="비밀번호 확인" register={register} name="password-repeat" validation={Validations.passwordRepeat} errors={errors} onBlur={() => handleBlur('password-repeat')} type='password' />
      <Button variant="solid" label="회원가입 하기" type="submit" disabled={!isButtonValid} className="h-[48px]" />
    </form>
    </>
  );
};

export default SignUpForm;
