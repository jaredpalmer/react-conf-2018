import React, { useState, useEffect } from 'react';
import { Spinner } from '../components/Spinner';

function Player({ url, onPause }) {
  const [isLoading, setLoading] = useState(true);
  useEffect(
    () => {
      const audio = new Audio(url);
      audio.onloadeddata = () => {
        setLoading(false);
        audio.play();
      };
      return () => {
        audio.pause();
        onPause();
      };
    },
    [url]
  );
  return (
    <React.Fragment>
      <div
        role="button"
        onClick={() => {
          onPause();
        }}
      >
        {isLoading ? (
          <Spinner className="avatar" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className="avatar"
            style={{ borderRadius: 0, height: 24 }}
            viewBox="0 0 32 32"
          >
            <g
              className="nc-icon-wrapper"
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="2"
              fill="rgb(34, 162, 70)"
              stroke="rgb(34, 162, 70)"
            >
              <rect
                x="3"
                y="2"
                fill="none"
                stroke="rgb(34, 162, 70)"
                strokeMiterlimit="10"
                width="7"
                height="28"
              />
              <rect
                x="22"
                y="2"
                fill="none"
                stroke="rgb(34, 162, 70)"
                strokeMiterlimit="10"
                width="7"
                height="28"
              />
            </g>
          </svg>
        )}
      </div>
    </React.Fragment>
  );
}

export function Track({ track }) {
  const [isPlaying, updatePlaying] = useState(false);
  function handlePause() {
    return updatePlaying(false);
  }
  return (
    <div className="item track" key={track.id}>
      {isPlaying ? (
        <Player url={track.preview_url} onPause={handlePause} />
      ) : (
        <svg
          className="avatar"
          style={{ borderRadius: 0, height: 24 }}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          onClick={() => updatePlaying(true)}
        >
          <polygon
            fill="none"
            stroke="#111111"
            strokeWidth="2"
            strokeMiterlimit="10"
            points="6,30 6,2 29,16 "
          />
        </svg>
      )}

      <div className="col">
        <div className="name">{track.name}</div>
        <div className="meta">{track.type.toUpperCase()}</div>
      </div>
    </div>
  );
}
