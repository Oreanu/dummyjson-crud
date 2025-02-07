import React from "react";

const DeleteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_2176_90009)">
        <path
          d="M0 24C0 10.7452 10.7452 0 24 0V0C37.2548 0 48 10.7452 48 24V24C48 37.2548 37.2548 48 24 48V48C10.7452 48 0 37.2548 0 24V24Z"
          fill="white"
          fillOpacity="0.12"
        />
        <path
          d="M24 47.5C11.0213 47.5 0.5 36.9787 0.5 24C0.5 11.0213 11.0213 0.5 24 0.5C36.9787 0.5 47.5 11.0213 47.5 24C47.5 36.9787 36.9787 47.5 24 47.5Z"
          stroke="#FCE6DE"
        />
      </g>
      <path
        d="M26.2833 21.4999L25.995 28.9999M22.005 28.9999L21.7167 21.4999M30.0233 18.8249C30.3083 18.8683 30.5917 18.9141 30.875 18.9633M30.0233 18.8249L29.1333 30.3941C29.097 30.8651 28.8842 31.3051 28.5375 31.626C28.1908 31.9469 27.7358 32.1251 27.2633 32.1249H20.7367C20.2642 32.1251 19.8092 31.9469 19.4625 31.626C19.1158 31.3051 18.903 30.8651 18.8667 30.3941L17.9767 18.8249M30.0233 18.8249C29.0616 18.6795 28.0948 18.5692 27.125 18.4941M17.9767 18.8249C17.6917 18.8674 17.4083 18.9133 17.125 18.9624M17.9767 18.8249C18.9384 18.6795 19.9052 18.5692 20.875 18.4941M27.125 18.4941V17.7308C27.125 16.7474 26.3667 15.9274 25.3833 15.8966C24.4613 15.8671 23.5387 15.8671 22.6167 15.8966C21.6333 15.9274 20.875 16.7483 20.875 17.7308V18.4941M27.125 18.4941C25.0448 18.3333 22.9552 18.3333 20.875 18.4941"
        stroke="#EB6033"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_b_2176_90009"
          x="-20"
          y="-20"
          width="88"
          height="88"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2176_90009"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2176_90009"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default DeleteIcon;
