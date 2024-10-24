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
        { 'bg-gray-600 text-white border-none': disabled },
        { 'bg-nomadBlack text-white': variant === 'solid' },
        {
          'bg-white border border-nomadBlack text-nomadBlack':
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
  type?: 'submit' | 'reset' | 'button' | undefined;
}
