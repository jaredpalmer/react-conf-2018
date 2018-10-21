import React from 'react';
import { fetch } from '../fetch';
import { Spinner } from '../components/Spinner';
import IconPerson from '../components/IconPerson';

class Artist extends React.Component {
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
    this.getArtist();
  };

  getArtist = () => {
    fetch(`https://api.spotify.com/v1/artists/${this.props.id}`)
      .then(res => res.json())
      .then(
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
                src={artist.images[0].url}
                alt={artist.name}
              />
            ) : (
              <IconPerson />
            )}

            <h1>{artist.name}</h1>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Artist;
