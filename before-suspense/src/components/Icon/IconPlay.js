import React from 'react';

function IconPlay(props) {
  return (
    <svg
      className="avatar"
      style={{ borderRadius: 0, height: 24 }}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...props}
    >
      <polygon
        fill="none"
        stroke="#111111"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="6,30 6,2 29,16 "
      />
    </svg>
  );
}

export default IconPlay;
