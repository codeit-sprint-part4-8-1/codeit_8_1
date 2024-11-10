import Image from 'next/image';

interface BackButtonProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickPageMove?: () => void;
}

export default function BackButton({
  setIsVisible,
  handleClickPageMove = () => {},
}: BackButtonProps) {
  return (
    <button
      type="button"
      className="flex justify-center items-center w-8 h-8 bg-white rounded-full border-2 border-gray-400 md:hidden"
      onClick={() => {
        setIsVisible(false);
        handleClickPageMove();
      }}
    >
      <Image
        src="/ico/ico_backArrow.svg"
        width={8}
        height={18}
        className="mr-[2px]"
        alt="뒤로 가기 아이콘"
      />
    </button>
  );
}
