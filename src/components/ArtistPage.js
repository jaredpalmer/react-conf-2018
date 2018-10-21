import React from 'react';
import ArtistDetails from './ArtistDetails';
import ArtistTopTracks from './ArtistTopTracks';
import ArtistRelatedArtists from './ArtistRelatedArtists';

class ArtistPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="artist">
        <ArtistDetails id={this.props.id} />
        <ArtistTopTracks
          id={this.props.id}
          key={`topTracks-${this.props.id}`}
        />
        <ArtistRelatedArtists
          id={this.props.id}
          key={`related-${this.props.id}`}
        />
      </div>
    );
  }
}

export default ArtistPage;
