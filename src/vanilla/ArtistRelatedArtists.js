import React from 'react';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
import { fetchArtistRelatedArtistsJSON } from '../api';
class ArtistRelatedArtists extends React.Component {
  state = {
    artists: [],
    isLoading: true,
  };

  componentDidMount() {
    fetchArtistRelatedArtistsJSON(this.props.id).then(
      artists => this.setState({ artists, isLoading: false }),
      error => {
        this.setState({ isLoading: false });
        // throw new Error(error);
        console.log(error);
      }
    );
  }

  render() {
    const { artists, isLoading } = this.state;
    return (
      <div>
        <h3>Related Artists</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : artists && artists.length > 0 ? (
          artists
            .slice(0, 3)
            .map(item => (
              <ListItem to={`/artist/${item.id}`} key={item.id} item={item} />
            ))
        ) : null}
      </div>
    );
  }
}

export default ArtistRelatedArtists;
