import React, { Fragment } from 'react';
import { fetchArtistAlbumsJSON } from '../api';
import { Spinner } from './Spinner';
import { Link } from '@reach/router';
import IconPerson from './Icon/IconPerson';

class ArtistAlbums extends React.Component {
  state = {
    isLoading: true,
    albums: [],
  };

  componentDidMount() {
    fetchArtistAlbumsJSON(this.props.id).then(
      albums => this.setState({ isLoading: false, albums }),
      error => this.setState({ isLoading: false, error })
    );
  }

  render() {
    const { isLoading, albums } = this.state;
    return (
      <>
        <h3>Albums</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : albums ? (
          <AlbumGrid albums={albums} />
        ) : null}
      </>
    );
  }
}

function AlbumGrid({ albums }) {
  return (
    <div className="album-grid">
      {albums &&
        albums
          .slice(0, 6)
          .map(album => <AlbumItem album={album} key={album.id} />)}
    </div>
  );
}

function AlbumItem({ album }) {
  return (
    <Link to={`/album/${album.id}`} key={album.id}>
      {album.images && album.images.length > 0 ? (
        <div className="album-artwork">
          <img
            className="album-image"
            src={album.images[0].url}
            alt={album.name}
          />
          <div className="album-title center">{album.name}</div>
          <div className="album-meta center">
            {album.total_tracks} Songs • {album.release_date.slice(0, 4)}
          </div>
        </div>
      ) : (
        <div className="album-artwork">
          <IconPerson />
        </div>
      )}
    </Link>
  );
}

export default ArtistAlbums;
