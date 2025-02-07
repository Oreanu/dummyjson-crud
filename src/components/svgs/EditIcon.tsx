import React from "react";

const EditIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_2176_90017)">
    <path d="M0 24C0 10.7452 10.7452 0 24 0V0C37.2548 0 48 10.7452 48 24V24C48 37.2548 37.2548 48 24 48V48C10.7452 48 0 37.2548 0 24V24Z" fill="white" fillOpacity="0.12"/>
    <path d="M24 47.5C11.0213 47.5 0.5 36.9787 0.5 24C0.5 11.0213 11.0213 0.5 24 0.5C36.9787 0.5 47.5 11.0213 47.5 24C47.5 36.9787 36.9787 47.5 24 47.5Z" stroke="#FCE6DE"/>
    </g>
    <path d="M28.0517 17.7394L29.4575 16.3327C29.7506 16.0396 30.148 15.875 30.5625 15.875C30.977 15.875 31.3744 16.0396 31.6675 16.3327C31.9606 16.6258 32.1252 17.0233 32.1252 17.4377C32.1252 17.8522 31.9606 18.2496 31.6675 18.5427L19.6933 30.5169C19.2528 30.9572 18.7095 31.2808 18.1125 31.4585L15.875 32.1252L16.5417 29.8877C16.7194 29.2907 17.043 28.7474 17.4833 28.3069L28.0525 17.7394H28.0517ZM28.0517 17.7394L30.25 19.9377" stroke="#EB6033" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
    <filter id="filter0_b_2176_90017" x="-20" y="-20" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2176_90017"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2176_90017" result="shape"/>
    </filter>
    </defs>
    </svg>
    
  );
};


export default EditIcon;