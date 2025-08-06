import type { ToastType } from "../types";

interface ToastProps {
  toast: ToastType;
  handleClose: (id: number) => void;
}

const Toast = ({ toast, handleClose }: ToastProps) => {
  return (
    <li key={toast.id} className={`toast-container ${toast.type}`}>
      <span className="toast-message">{toast.message}</span>
      <span onClick={() => handleClose(toast.id!)} className="toast-icon">
        X
      </span>
    </li>
  );
};

export default Toast;
