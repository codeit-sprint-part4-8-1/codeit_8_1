import Image from "next/image";
import Link from "next/link"
import { useRouter } from 'next/router';

export const AuthBottom = () => {
  const router = useRouter();
  const currentPath = router.pathname as '/login' | '/signup';
  const textObj = {
    '/login' : [' 아니신가요?','/signup','회원가입하기','로그인하기'],
    '/signup' : ['신가요?','/login','로그인하기','회원가입하기']
  }

  return(
    <>
        <div className="mt-[32px] text-16-400">
            <p>회원이{textObj?.[currentPath]?.[0]} <Link className='text-green-200 underline' href={textObj?.[currentPath]?.[1]}>{textObj?.[currentPath]?.[2]}</Link></p>
        </div>
        <div className="mt-[40px] md:mt-[48px]">
          <p>SNS 계정으로 {textObj?.[currentPath]?.[3]}</p>
          
          <div className="flex justify-center gap-[18px] mt-[24px] md:mt-[40px]">
            <button type='button' className="flex justify-center items-center w-[48px] h-[48px] border border-[#f2f2f2] rounded-full">
            <div className="relative w-[18px] h-[18px]"><Image src='/ico/ico_google.svg' alt="google" fill style={{objectFit : 'contain'}} /></div>
            </button>
            <button type='button' className="flex justify-center items-center w-[48px] h-[48px] border border-[#f2f2f2] rounded-full">
            <div className="relative w-[18px] h-[18px]"><Image src='/ico/ico_kakaotalk.svg' alt="kakaotalk" fill style={{objectFit : 'contain'}} /></div>
            </button>
          </div>
        </div>
    </>
  )
}

export default AuthBottom;