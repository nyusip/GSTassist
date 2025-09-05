import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600 dark:text-blue-500"
    >
      <path
        d="M8 16C8 13.7909 9.79086 12 12 12H22C24.2091 12 26 13.7909 26 16V22C26 24.2091 24.2091 26 22 26H12C9.79086 26 8 24.2091 8 22V16Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 10C6 7.79086 7.79086 6 10 6H20C22.2091 6 24 7.79086 24 10V20C24 22.2091 22.2091 24 20 24H10C7.79086 24 6 22.2091 6 20V10Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
