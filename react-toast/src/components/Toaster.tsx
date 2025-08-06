import type { ToastType } from "../types";

interface ToasterProps {
  toasts: ToastType[];
  handleClose: (id: number) => void;
}
const Toaster = ({ toasts, handleClose }: ToasterProps) => {
  return (
    <ul className="toaster">
      {toasts.map(toast => (
        <li key={toast.id} className={`toast-container ${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
          <span onClick={() => handleClose(toast.id!)} className="toast-icon">
            X
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Toaster;
