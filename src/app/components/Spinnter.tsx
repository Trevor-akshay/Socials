import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="text-gray-300 animate-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path
          d="M32 3C35.8 3 39.6 3.8 43.1 5.2C46.6 6.7 49.8 8.8 52.5 11.5C55.2 14.2 57.3 17.4 58.8 20.9C60.2 24.4 61 28.2 61 32C61 35.8 60.2 39.6 58.8 43.1C57.3 46.6 55.2 49.8 52.5 52.5C49.8 55.2 46.6 57.3 43.1 58.8C39.6 60.2 35.8 61 32 61C28.2 61 24.4 60.2 20.9 58.8C17.4 57.3 14.2 55.2 11.5 52.5C8.8 49.8 6.7 46.6 5.2 43.1C3.8 39.6 3 35.8 3 32C3 28.2 3.8 24.4 5.2 20.9C6.7 17.4 8.8 14.2 11.5 11.5C14.2 8.8 17.4 6.7 20.9 5.2C24.4 3.8 28.2 3 32 3Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 3C36.6 3 41.1 4.1 45.2 6.2C49.2 8.2 52.8 11.3 55.5 15C58.2 18.7 59.9 23 60.6 27.5C61.4 32 61 36.6 59.6 41"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500"
        />
      </svg>
    </div>
  );
};

export default Spinner;
