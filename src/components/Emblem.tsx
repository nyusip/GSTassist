import React from 'react';

const Emblem: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="url(#paint0_linear_1)" />
    <path
      d="M13.5 14H26.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 19H21.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 11.5V28.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 22.5C21.5 22.5 24.5 22.5 24.5 24.5C24.5 26.5 21.5 26.5 21.5 26.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1"
        x1="0"
        y1="0"
        x2="40"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
  </svg>
);

export default Emblem;
