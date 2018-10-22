import React from 'react';
import { Spinner } from './Spinner';
import { Track } from './Track';
import { fetchArtistTopTracksJSON } from '../api';

class ArtistTopTracks extends React.Component {
  state = {
    tracks: [],
    isLoading: true,
  };

  componentDidMount() {
    fetchArtistTopTracksJSON(this.props.id).then(
      tracks => this.setState({ tracks, isLoading: false }),
      error => this.setState({ isLoading: false })
    );
  }

  render() {
    const { tracks, isLoading, currentId } = this.state;
    return (
      <div className="topTracks">
        <h3>Top Tracks</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : (
          tracks &&
          tracks
            .slice(0, 3)
            .map(track => (
              <Track
                key={track.id}
                track={track}
                play={this.play}
                pause={this.pause}
                currentId={currentId}
              />
            ))
        )}
      </div>
    );
  }
}

export default ArtistTopTracks;
