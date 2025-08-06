import { useRef, useState } from "react";
import "./App.css";
import type { ToastType } from "./types";
import Toaster from "./components/Toaster";
import ButtonsContainer from "./components/ButtonsContainer";

function App() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const timersRef = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>(
    {}
  );

  const handleClose = (id: number) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleClickToast =
    ({ type, message }: ToastType) =>
    () => {
      const id = new Date().getSeconds();
      const newToast = {
        id,
        type,
        message,
      };
      setToasts(prev => [newToast, ...prev]);

      timersRef.current[id] = setTimeout(() => handleClose(id), 5000);
    };

  return (
    <div className="container">
      <ButtonsContainer handleClick={handleClickToast} />
      <Toaster toasts={toasts} handleClose={handleClose} />
    </div>
  );
}

export default App;
