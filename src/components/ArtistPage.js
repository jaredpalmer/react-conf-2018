import React from 'react';
import ArtistTopTracks from './ArtistTopTracks';
import ArtistDetails from './ArtistDetails';
import ArtistAlbums from './ArtistAlbums';
import { Spinner } from './Spinner';

class ArtistPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="artist">
        <React.Suspense fallback={<Spinner size="large" />}>
          <ArtistDetails id={this.props.id} key={`artist-${this.props.id}`} />
          <ArtistTopTracks
            id={this.props.id}
            key={`topTracks-${this.props.id}`}
          />
          <ArtistAlbums id={this.props.id} key={`albums-${this.props.id}`} />
        </React.Suspense>
      </div>
    );
  }
}

export default ArtistPage;
