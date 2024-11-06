import clsx from 'clsx';

export const Button = ({
  label,
  variant,
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        className,
        'h-[38px] rounded-[6px] text-14-700',

        {
          'bg-gray-600 text-white border-none': disabled, // disabled 상태일 때 우선 적용
        },
        !disabled && {
          // disabled가 아닐 때만 variant에 따라 클래스 적용
          'bg-nomadBlack hover:bg-[#234223] text-white': variant === 'solid',
          'bg-white border hover:bg-[#edf2ed] border-nomadBlack text-nomadBlack':
            variant === 'line',
        },
      )}
      {...props}
    >
      {label}
    </button>
  );
};

interface ButtonProps {
  label: string;
  variant: 'solid' | 'line';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;

  type?: 'button' | 'reset' | 'submit';
}
