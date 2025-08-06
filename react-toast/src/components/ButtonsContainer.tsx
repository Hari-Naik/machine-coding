import type { ToastType } from "../types";

interface PropsType {
  handleClick: ({ type, message }: ToastType) => () => void;
}

const ButtonsContainer = ({ handleClick }: PropsType) => {
  return (
    <div className="btns-container">
      <button
        className="btn"
        onClick={handleClick({ type: "success", message: "Success" })}>
        Success Toast
      </button>
      <button
        className="btn"
        onClick={handleClick({ type: "info", message: "Info" })}>
        Info Toast
      </button>
      <button
        className="btn"
        onClick={handleClick({ type: "warning", message: "Warning" })}>
        Warning Toast
      </button>
      <button
        className="btn"
        onClick={handleClick({ type: "error", message: "Error" })}>
        Error Toast
      </button>
    </div>
  );
};

export default ButtonsContainer;
