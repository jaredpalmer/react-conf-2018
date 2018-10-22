import React from 'react';
import { Spinner } from './Spinner';
import IconPerson from './Icon/IconPerson';
import { fetchArtistJSON } from '../api';

class ArtistDetails extends React.Component {
  state = {
    artist: null,
    isLoading: true,
  };

  componentDidMount() {
    fetchArtistJSON(this.props.id).then(
      artist => this.setState({ isLoading: false, artist }),
      error => this.setState({ isLoading: false, error })
    );
  }

  render() {
    const { artist, isLoading } = this.state;

    return isLoading ? (
      <Spinner className="center" />
    ) : artist ? (
      <ArtistHeader artist={artist} />
    ) : (
      'Something went wrong'
    );
  }
}

function ArtistHeader({ artist }) {
  return (
    <div className="heading row">
      {artist.images && artist.images.length > 0 ? (
        <img className="artwork" src={artist.images[2].url} alt={artist.name} />
      ) : (
        <IconPerson />
      )}

      <div>
        <h1>{artist.name}</h1>
        <div className="meta">
          {artist.followers.total.toLocaleString()} followers
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
