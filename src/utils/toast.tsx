import { toast } from 'react-toastify';

type TOAST_TYPE = 'success' | 'error' | 'warning' | 'info' | 'default';
export const showToast = (
  message: string,
  type: TOAST_TYPE,
  delay?: number
) => {
  toast(message, {
    autoClose: delay || 3000,
    progress: 0,
    type,
    position: 'top-center',
    hideProgressBar: true,
    pauseOnHover: true,
    theme: 'light',
    className: 'text-2xl',
  });
};
