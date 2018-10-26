import React from 'react';
import { Track } from './Track';
import { fetchArtistTopTracksJSON } from '../api';
import { unstable_createResource } from 'react-cache';

const ArtistTopTracksResource = unstable_createResource(
  fetchArtistTopTracksJSON
);

export default function ArtistTopTracks(props) {
  return (
    <div className="topTracks">
      <h3>Top Tracks</h3>
      {ArtistTopTracksResource.read(props.id)
        .slice(0, 3)
        .map(track => (
          <Track key={track.id} track={track} />
        ))}
    </div>
  );
}
