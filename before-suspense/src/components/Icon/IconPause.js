import React from 'react';

function IconPause(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      className="avatar"
      style={{ borderRadius: 0, height: 24 }}
      {...props}
      viewBox="0 0 32 32"
    >
      <g
        className="nc-icon-wrapper"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="#00a1ff"
        stroke="#00a1ff"
      >
        <rect
          x="3"
          y="2"
          fill="none"
          stroke="#00a1ff"
          strokeMiterlimit="10"
          width="7"
          height="28"
        />
        <rect
          x="22"
          y="2"
          fill="none"
          stroke="#00a1ff"
          strokeMiterlimit="10"
          width="7"
          height="28"
        />
      </g>
    </svg>
  );
}

export default IconPause;
