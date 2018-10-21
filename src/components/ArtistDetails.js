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
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ isLoading: true, artist: null });
      this.getData();
    }
  }

  getData = () => {
    fetchArtistJSON(this.props.id).then(
      artist => this.setState({ artist, isLoading: false }),
      error => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    const { artist, isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading ? (
          <Spinner className="center" />
        ) : artist ? (
          <div className="heading row">
            {artist.images && artist.images.length > 0 ? (
              <img
                className="artwork"
                src={artist.images[2].url}
                alt={artist.name}
              />
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
        ) : null}
      </React.Fragment>
    );
  }
}

export default ArtistDetails;
