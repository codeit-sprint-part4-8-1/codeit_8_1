import { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';

interface StatusModalLayoutProps {
  isOpenModal: boolean;
  children: ReactNode;
  onClose: () => void;
}

const statusModalLayout = ({
  isOpenModal,
  children,
  onClose,
}: StatusModalLayoutProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpenModal) return null;

  return modalRoot
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
          <div ref={wrapperRef}>{children}</div>
        </div>,
        modalRoot,
      )
    : null;
};

export default statusModalLayout;
