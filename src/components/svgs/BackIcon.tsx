import React from "react";

const BackIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="23.5"
        fill="white"
        stroke="#FCE6DE"
      />
      <path
        d="M22.75 30.25L16.5 24M16.5 24L22.75 17.75M16.5 24H31.5"
        stroke="#EB6033"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackIcon;
