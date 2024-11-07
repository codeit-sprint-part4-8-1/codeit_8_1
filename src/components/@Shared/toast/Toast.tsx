import { useEffect } from 'react';
import { ToastProps } from './ToastType';
import ToastUi from './ToastUi';

function Toast({ onShow, children }: ToastProps) {
  useEffect(() => {
    const showToastTimer = setTimeout(() => {
      onShow();
    }, 3000);

    return () => {
      clearTimeout(showToastTimer);
    };
  }, [onShow]);
  return <ToastUi>{children}</ToastUi>;
}
export default Toast;
