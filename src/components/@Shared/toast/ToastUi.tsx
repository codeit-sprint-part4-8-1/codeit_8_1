import { ToastUiProps } from './ToastType';

function ToastUi({ children }: ToastUiProps) {
  return (
    <div
      className={`fixed left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded border bg-green-200 p-4 text-base leading-6 text-white tablet:text-sm  mobile:text-xs ${
        window.innerWidth > 768 ? 'top-1/2' : 'bottom-4'
      }`}
    >
      {children}
    </div>
  );
}

export default ToastUi;
