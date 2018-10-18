import React from 'react';
import { fetch } from '../fetch';
import { createResource } from 'react-cache';
import { cache } from '../cache';
import { Track, AudioResource } from '../components/Track';

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

class ArtistTopTracks extends React.Component {
  render() {
    const tracks = ArtistTopTracksResource.read(cache, this.props.id);
    tracks.slice(0, 3).forEach(track => {
      AudioResource.preload(cache, track.preview_url);
    });
    return (
      <div className="topTracks">
        <h3 className="center">Top Tracks</h3>
        {tracks.map(track => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    );
  }
}

export default ArtistTopTracks;
