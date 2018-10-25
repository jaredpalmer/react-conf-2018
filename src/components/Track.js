import React from 'react';
import { Spinner } from './Spinner';
import IconPause from './Icon/IconPause';
import IconPlay from './Icon/IconPlay';
import { PlayerContext } from './PlayerProvider';

export function Track({ track }) {
  return (
    <PlayerContext.Consumer>
      {({ currentTrack, play, pause, isLoading, isPlaying }) => {
        const iAmPlaying =
          currentTrack && currentTrack.id === track.id && isPlaying;
        return (
          <div
            className="item track"
            key={track.id}
            role="button"
            onClick={iAmPlaying ? pause(track) : play(track)}
          >
            {currentTrack && currentTrack.id === track.id ? (
              isLoading ? (
                <Spinner className="avatar" />
              ) : isPlaying ? (
                <IconPause />
              ) : (
                <IconPlay />
              )
            ) : (
              <IconPlay />
            )}

            <div className="col">
              <div className="name">{track.name}</div>
              <div className="meta">{track.type.toUpperCase()}</div>
            </div>
          </div>
        );
      }}
    </PlayerContext.Consumer>
  );
}
