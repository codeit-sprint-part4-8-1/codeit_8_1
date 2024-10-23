import { Button } from "../@Shared/Buttons/Button";

interface ModalProps {
  title: string;
  isOpen : boolean;
  onClose : () => void;
}

const Modal = ({isOpen, title, onClose} : ModalProps) => {
  
  if (isOpen) {
    return(
    <div className="fixed inset-0 z-10 flex items-center justify-center h-screen bg-[#000000] bg-opacity-70">
      <div className="w-96 h-48 z-20 bg-white border-black">
        <h1>{title}</h1>
      <Button label="닫기" variant="line" onClick={onClose} type="button" />
      </div>
    </div>
  ) 
} else return;
  
}

export default Modal;