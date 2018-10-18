import React, { useState, useEffect } from 'react';
import { createResource } from 'react-cache';
import { cache } from '../cache';
import { Spinner } from './Spinner';

export const AudioResource = createResource(
  src => {
    const audio = document.createElement('audio');
    return new Promise((resolve, reject) => {
      audio.src = src;
      audio.onerror = reject;
      audio.onloadeddata = () => resolve(audio);
    });
  },
  src => src
);

function Player({ url, onPause }) {
  const audio = AudioResource.read(cache, url);
  useEffect(
    () => {
      audio.play();
      return () => {
        audio.pause();
        onPause();
      };
    },
    [url]
  );
  return (
    <React.Fragment>
      <button
        onClick={() => {
          onPause();
        }}
      >
        <span rol="img">⏸</span>
      </button>
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
        <React.unstable_ConcurrentMode>
          <React.Placeholder fallback={<Spinner />}>
            <Player url={track.preview_url} onPause={handlePause} />
          </React.Placeholder>
        </React.unstable_ConcurrentMode>
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
