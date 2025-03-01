import React from "react";
import { createRoot } from "react-dom/client";

type Props = {
  message: string;
  isSuccess: boolean;
};

const Alert: React.FC<Props> = ({ message, isSuccess }) => {
  return (
    <div className="fixed inset-x-0  w-full z-50 top-0 flex items-end justify-center px-4 py-3">
      <div
        className="px-6 py-3 rounded-md text-lg flex items-center max-w-lg shadow-lg text-white"
        style={{
          backgroundColor: isSuccess ? "#27823D" : "#9F0504",
          color: "white",
          maxWidth: "90%",
        }}
      >
        {isSuccess ? (
          <svg
            viewBox="0 0 24 24"
            className="text-white w-5 h-5 mr-3"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12A12.014,12.014,0,0,0,12,0ZM18.927,8.2L12.082,17.489a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261l6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="text-white w-5 h-5 mr-3"
          >
            <path
              fill="currentColor"
              d="M12,0a12,12,0,1,0,12,12A12.014,12.014,0,0,0,12,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47a1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6A1,1,0,1,1,11,12.5Z"
            />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};


export const showAlert = (message: string, isSuccess: boolean = false) => {
  const alertContainer = document.createElement("div");
  document.body.appendChild(alertContainer);

  const root = createRoot(alertContainer);
  root.render(<Alert message={message} isSuccess={isSuccess} />);

  setTimeout(() => {
    root.unmount();
    document.body.removeChild(alertContainer);
  }, 3000);
};

export default Alert;
