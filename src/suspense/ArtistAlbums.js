import React from 'react';
import { fetch } from '../fetch';
import uniqBy from 'lodash.uniqby';
import ListItem from '../components/ListItem';
class ArtistAlbums extends React.Component {
  state = {
    albums: [],
    isLoading: true,
    currentId: null,
  };

  componentDidMount() {
    this.getArtistAlbums();
  }

  getArtistAlbums = () => {
    fetch(
      `https://api.spotify.com/v1/artists/${
        this.props.id
      }/albums?market=from_token&album_type=album`
    )
      .then(res => res.json())
      .then(
        ({ items }) =>
          this.setState({ albums: uniqBy(items, 'name'), isLoading: false }),
        error => {
          this.setState({ isLoading: false });
          // throw new Error(error);
          console.log(error);
        }
      );
  };

  render() {
    const { albums, isLoading, currentId } = this.state;
    if (isLoading) {
      return '...loading';
    }
    return (
      <div className="albums">
        <h3>Albums</h3>
        {albums.length > 0 &&
          albums.map(item => (
            <ListItem
              to={`/album/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={currentId}
            />
          ))}
      </div>
    );
  }
}

export default ArtistAlbums;
