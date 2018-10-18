import React from 'react';
import { fetch } from '../fetch';
import { Spinner } from '../components/Spinner';
import { createResource } from 'react-cache';
import { cache } from '../cache';
import { Img } from 'the-platform';

const ArtistRelatedArtists = React.lazy(() => import('./ArtistRelatedArtists'));
const ArtistTopTracks = React.lazy(() => import('./ArtistTopTracks'));

const ArtistResource = createResource(id =>
  fetch(`https://api.spotify.com/v1/artists/${id}`)
    .then(res => res.json())
    .then(artist => artist)
);

const ImageResource = createResource(
  ({ src }) => {
    return new Promise((resolve, reject) => {
      const image = new Image(src);
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
  },
  ({ src }) => src
);

const ArtistHeading = ({ id }) => {
  const artist = ArtistResource.read(cache, id);
  return (
    <div className="heading row">
      {artist.images && artist.images.length > 0 ? (
        <img className="artwork" src={artist.images[2].url} alt={artist.name} />
      ) : (
        <svg
          className="artwork"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="#bbb"
            d="M16.757,0.018C7.971-0.393,0.436,6.43,0.018,15.242c-0.417,8.812,6.413,16.322,15.226,16.74 C15.5,31.995,15.754,32,16.009,32c8.477,0,15.567-6.688,15.974-15.243C32.399,7.945,25.569,0.436,16.757,0.018z M15.338,29.984 c-3.364-0.16-6.396-1.501-8.717-3.601c0.539-2.335,2.255-3.211,4.607-3.995c1.47-0.49,2.182-1.733,2.53-2.827 C11.557,18.67,10,16.515,10,14v-2c0-3.309,2.691-6,6-6s6,2.691,6,6v2c0,2.516-1.558,4.672-3.759,5.562 c0.348,1.094,1.062,2.336,2.532,2.826c2.352,0.784,4.055,1.67,4.59,4.007C22.713,28.786,19.162,30.174,15.338,29.984z"
          />
        </svg>
      )}

      <h1>{artist.name}</h1>
    </div>
  );
};

class Artist extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      window.scrollTo(0, -50);
    }
  }

  render() {
    return (
      <div className="artist">
        <React.Placeholder
          delayMs={1000}
          fallback={<Spinner className="center" style={{ fill: 'red' }} />}
        >
          <ArtistHeading id={this.props.id} />

          <ArtistTopTracks
            id={this.props.id}
            key={`topTracks-${this.props.id}`}
          />

          <ArtistRelatedArtists
            id={this.props.id}
            key={`related-${this.props.id}`}
          />
        </React.Placeholder>
      </div>
    );
  }
}

export default Artist;
