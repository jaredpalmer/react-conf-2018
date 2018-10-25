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
      <div>
        <ArtistHeader artist={artist} />
        <ArtistConcerts artist={artist} />
      </div>
    ) : (
      'Something went wrong'
    );
  }
}

function ArtistHeader({ artist }) {
  return (
    <div className="heading row">
      {artist.images && artist.images.length > 0 ? (
        <img className="artwork" src={artist.images[0].url} alt={artist.name} />
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

class ArtistConcerts extends React.Component {
  handleClick = () => {
    window.FakeStripe.charge();
  };

  render() {
    const { concert } = this.props.artist;
    return concert ? (
      <div className="artist-concerts">
        <h3>Next Concert</h3>
        <div className="row ">
          <div>
            <h4>{concert.venue}</h4>
            <div>
              {concert.cityState}, {concert.date}
            </div>
          </div>
          <button onClick={this.handleClick}>Buy Tickets</button>
        </div>
      </div>
    ) : null;
  }
}

export default ArtistDetails;
