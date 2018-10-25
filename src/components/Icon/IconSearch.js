import React from 'react';

export function IconSearch(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <g
        class="nc-icon-wrapper"
        strokeWidth="2"
        fill="#999"
        stroke="#999"
      >
        <circle
          fill="none"
          stroke="#999"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          cx="7.5"
          cy="7.5"
          r="6"
        />{' '}
        <line
          fill="none"
          stroke="#999"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="15.5"
          y1="15.5"
          x2="11.742"
          y2="11.742"
        />{' '}
      </g>
    </svg>
  );
}

IconSearch.displayName = 'IconSearch';
