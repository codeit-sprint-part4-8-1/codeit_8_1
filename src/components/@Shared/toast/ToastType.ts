import { ReactNode } from 'react';

interface ToastUiProps {
  children: ReactNode;
}

interface ToastProps {
  onShow: () => void;
  children: ReactNode;
}

export type { ToastUiProps, ToastProps };
