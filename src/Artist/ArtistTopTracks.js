import React from 'react';
import { fetch } from '../fetch';

class ArtistTopTracks extends React.Component {
  state = {
    tracks: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getArtistTopTracks();
  }

  getArtistTopTracks = () => {
    fetch(
      `https://api.spotify.com/v1/artists/${this.props.id}/top-tracks?market=US`
    )
      .then(res => res.json())
      .then(
        ({ tracks }) =>
          console.log(tracks) || this.setState({ tracks, isLoading: false }),
        error => {
          this.setState({ isLoading: false });
          throw new Error(error);
        }
      );
  };

  render() {
    const { tracks, isLoading } = this.state;

    if (isLoading) {
      return '...loading';
    }
    return (
      <div className="topTracks">
        <h3 className="center">Top Tracks</h3>
        {tracks &&
          tracks.length > 0 &&
          tracks.map(track => (
            <div className="item track" key={track.id}>
              <svg
                className="avatar"
                style={{ borderRadius: 0, height: 24 }}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <polygon
                  fill="none"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  points="6,30 6,2 29,16 "
                />
              </svg>

              <div className="col">
                <div className="name">{track.name}</div>
                <div className="meta">{track.type.toUpperCase()}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default ArtistTopTracks;
