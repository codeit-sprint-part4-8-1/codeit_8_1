import { Button } from "../@Shared/Buttons/Button";

interface ModalProps {
  message: string;
  isOpen : boolean;
  onClose : () => void;
}

const Modal = ({isOpen, message, onClose} : ModalProps) => {
  
  if (isOpen) {
    return(
    <div className="fixed inset-0 z-10 flex items-center justify-center h-screen bg-[#000000] bg-opacity-70">
      <div className="gap-[20px] flex flex-col w-96 h-48 z-20 bg-white border-black rounded-lg text-16-500 p-6 justify-center items-center">
        <h1>{message}</h1>
      <Button label="닫기" variant="solid" onClick={onClose} type="button" className="w-[138px] h-[32px]" />
      </div>
    </div>
  ) 
} else return;
}

export default Modal;