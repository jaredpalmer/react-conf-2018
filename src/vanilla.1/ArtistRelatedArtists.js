import React, { useState } from 'react';
import { fetch } from '../fetch';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
import { cache } from '../cache';
import { createResource } from 'react-cache';

const ArtistRelatedArtistResource = createResource(id =>
  fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`)
    .then(res => res.json())
    .then(({ artists }) => artists)
);

export default function ArtistRelatedArtist({ id }) {
  const artists = ArtistRelatedArtistResource.read(cache, id);
  const [currentId, updateCurrentId] = useState(null);

  return (
    <div>
      <h3>Related Artists</h3>
      {artists.map(artist => (
        <ListItem
          item={artist}
          currentId={currentId}
          key={artist.id}
          to={`/artist/${artist.id}`}
          onClick={id => updateCurrentId(id)}
        />
      ))}
    </div>
  );
}
