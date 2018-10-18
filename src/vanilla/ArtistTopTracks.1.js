import React, { useState, useEffect } from 'react';
import { fetch } from '../full-suspense/fetch';
import { createResource } from 'react-cache';
import { cache } from '../full-suspense/cache';

const ArtistTopTracksResource = createResource(id =>
  fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`)
    .then(res => res.json())
    .then(
      ({ tracks }) => tracks,
      error => {
        throw new Error(error);
      }
    )
);

export const AudioResource = createResource(
  src => {
    const audio = new Audio(src);
    return new Promise((resolve, reject) => {
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

function Track({ track, playingUrl, onPlay }) {
  return (
    <div className="item track" key={track.id} onClick={onPlay}>
      {playingUrl === track.preview_url ? (
        <Player src={track.preview_url} />
      ) : (
        <span>&#9654;</span>
      )}

      <div className="col">
        <div className="name">{track.name}</div>
        <div className="meta">{track.type.toUpperCase()}</div>
      </div>
    </div>
  );
}
class ArtistTopTracks extends React.Component {
  state = {
    playingUrl: '',
    audio: null,
    playing: false,
  };

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    console.log(audio);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio,
      });
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false,
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio,
        });
      }
    }
  }

  render() {
    const tracks = ArtistTopTracksResource.read(cache, this.props.id);
    tracks.slice(0, 3).forEach(track => {
      AudioResource.preload(cache, track.preview_url);
    });

    return (
      <div className="topTracks">
        <h3 className="center">Top Tracks</h3>
        {tracks.map(track => (
          <Track
            key={track.id}
            track={track}
            onPlay={() => this.playAudio(track.preview_url)}
            {...this.state}
          />
        ))}
      </div>
    );
  }
}

export default ArtistTopTracks;
