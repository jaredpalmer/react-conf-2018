import React from 'react';
import { Spinner } from '../components/Spinner';
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

  pause = currentId => () => {
    this.setState({ currentId: undefined });
  };

  play = currentId => () => {
    this.setState({ currentId });
  };

  render() {
    const { tracks, isLoading, currentId } = this.state;
    return (
      <div className="topTracks">
        <h3 className="center">Top Tracks</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : (
          tracks &&
          tracks
            .slice(0, 10)
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
