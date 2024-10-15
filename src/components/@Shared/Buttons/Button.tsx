import clsx from "clsx";

const Button = ({
  label,
  variant,
  disabled,
  onClick,
}: ButtonProps ) => {
  return(<button
  className={
    clsx(
      {'bg-black': variant === 'solid'},
      {'bg-gray': variant === 'line'},
    )
  }
  >
    {label}
  </button>)
}

interface ButtonProps {
  label : string,
  variant : 'solid' | 'line', 
  disabled? : boolean,
  onClick? : ()=>{},
}
