import React from 'react';
import { fetch } from '../fetch';

class ArtistRelatedArtists extends React.Component {
  state = {
    related: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getArtistTopRelatedArtists();
  }

  getArtistRelated = () => {
    fetch(`https://api.spotify.com/v1/artists/${this.props.id}/related-artists`)
      .then(res => res.json())
      .then(
        related => this.setState({ related, isLoading: false }),
        error => {
          this.setState({ isLoading: false });
          // throw new Error(error);
          console.log(error);
        }
      );
  };

  render() {
    const { related, isLoading } = this.state;
    if (isLoading) {
      return '...loading';
    }
    return (
      <div>
        <h3>Related Artists</h3>
        {JSON.stringify(related, null, 2)}
      </div>
    );
  }
}

export default ArtistRelatedArtists;
