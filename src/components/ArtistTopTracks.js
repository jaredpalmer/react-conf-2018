import React from 'react';
import { Track } from './Track';
import { fetchArtistTopTracksJSON } from '../api';
import { unstable_createResource as createResource } from 'react-cache';

const ArtistTopTracksResource = createResource(
  fetchArtistTopTracksJSON
);

class ArtistTopTracks extends React.Component {
  render() {
    const tracks = ArtistTopTracksResource.read(this.props.id);
    return (
      <div className="topTracks">
        <h3>Top Tracks</h3>
        {tracks &&
          tracks
            .slice(0, 3)
            .map(track => (
              <Track
                key={track.id}
                track={track}
                play={this.play}
                pause={this.pause}
              />
            ))}
      </div>
    );
  }
}

export default ArtistTopTracks;
