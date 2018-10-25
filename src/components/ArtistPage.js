import React from 'react';
import ArtistTopTracks from './ArtistTopTracks';
import ArtistDetails from './ArtistDetails';

import ArtistAlbums from './ArtistAlbums';

class ArtistPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="artist">
        <ArtistDetails id={this.props.id} key={`artist-${this.props.id}`} />
        <ArtistTopTracks
          id={this.props.id}
          key={`topTracks-${this.props.id}`}
        />
        <ArtistAlbums id={this.props.id} key={`albums-${this.props.id}`} />
      </div>
    );
  }
}

export default ArtistPage;
