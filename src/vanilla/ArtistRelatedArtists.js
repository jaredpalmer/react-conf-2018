import React from 'react';
import { fetch } from '../fetch';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
class ArtistRelatedArtists extends React.Component {
  state = {
    artists: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getArtistRelated();
  }

  getArtistRelated = () => {
    fetch(`https://api.spotify.com/v1/artists/${this.props.id}/related-artists`)
      .then(res => res.json())
      .then(
        ({ artists }) => this.setState({ artists, isLoading: false }),
        error => {
          this.setState({ isLoading: false });
          // throw new Error(error);
          console.log(error);
        }
      );
  };

  render() {
    const { artists, isLoading } = this.state;
    return (
      <div>
        <h3>Related Artists</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : artists && artists.length > 0 ? (
          artists.map(item => (
            <ListItem to={`/artist/${item.id}`} key={item.id} item={item} />
          ))
        ) : null}
      </div>
    );
  }
}

export default ArtistRelatedArtists;
