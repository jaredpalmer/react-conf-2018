import React from 'react';
import Artist from './Artist';
import ArtistTopTracks from './ArtistTopTracks';
import ArtistRelatedArtists from './ArtistRelatedArtists';
import { Spinner } from '../components/Spinner';

class ArtistPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      window.scrollTo(0, -50);
    }
  }

  render() {
    return (
      <div className="artist">
        <Artist id={this.props.id} />
        <ArtistTopTracks
          id={this.props.id}
          key={`topTracks-${this.props.id}`}
        />
        {/* <ArtistAlbums id={this.props.id} key={this.props.id} /> */}
        <ArtistRelatedArtists
          id={this.props.id}
          key={`related-${this.props.id}`}
        />
      </div>
    );
  }
}

export default ArtistPage;
