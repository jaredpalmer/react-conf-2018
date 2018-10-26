import React, { Suspense } from 'react';
import { fetchArtistJSON } from '../api';
import { Img } from 'the-platform';
import { unstable_createResource } from 'react-cache';

const ArtistDetailsResource = unstable_createResource(fetchArtistJSON);

const ArtistDetails = ({ id }) => (
  <ArtistHeader artist={ArtistDetailsResource.read(id)} />
);

function ArtistHeader({ artist }) {
  return (
    <div className="heading">
      <Suspense
        maxDuration={500}
        fallback={
          <img
            className="artist-image preview"
            src={artist.images[2].url}
            alt={artist.name}
          />
        }
      >
        <Img
          className="artist-image loaded"
          src={artist.images[0].url}
          alt={artist.name}
        />
      </Suspense>
      <div>
        <h1>{artist.name}</h1>
        <div className="meta">
          {artist.followers.total.toLocaleString()} followers
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
