import React, { Fragment } from 'react';
import { fetchArtistAlbumsJSON } from '../api';
import { Link } from '@reach/router';
import { SuperImage } from './Img';
import { unstable_createResource as createResource } from 'react-cache';

const ArtistAlbumsResource = createResource(fetchArtistAlbumsJSON);

class ArtistAlbums extends React.Component {
  render() {
    const albums = ArtistAlbumsResource.read(this.props.id);
    return (
      <Fragment>
        <h3>Albums</h3>
        <AlbumGrid albums={albums} />
      </Fragment>
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
      <div className="album-artwork">
        <SuperImage
          className="album-image"
          images={album.images}
          alt={album.name}
        />
        <div className="album-title center">{album.name}</div>
        <div className="album-meta center">
          {album.total_tracks} Songs • {album.release_date.slice(0, 4)}
        </div>
      </div>
    </Link>
  );
}

export default ArtistAlbums;
