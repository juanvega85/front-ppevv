import { ToastContainer, toast } from 'react-toastify';

export const ToastsProvider = () => {
  return <ToastContainer position="top-right" hideProgressBar={false} newestOnTop closeOnClick rtl={false} draggable pauseOnHover autoClose={1000} />;
};

export const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'info') => {
  return toast(message, { type });
};
