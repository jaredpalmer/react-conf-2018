import React, { useState } from 'react';
import { fetch } from '../fetch';
import { createResource } from 'react-cache';
import { cache } from '../cache';
import ListItem from './SuspenseListItem';

const ArtistRelatedArtistsResource = createResource(id =>
  fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`)
    .then(res => res.json())
    .then(
      ({ artists }) => artists,
      error => {
        throw new Error(error);
      }
    )
);

function ArtistRelatedArtists(props) {
  const [currentId, setCurrent] = useState(null);
  const related = ArtistRelatedArtistsResource.read(cache, props.id);
  return (
    <div>
      <h3>Related Artists</h3>
      {related &&
        related
          .slice(0, 3)
          .map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => setCurrent(currentId)}
              key={item.id}
              item={item}
              currentId={currentId}
            />
          ))}
    </div>
  );
}

export default ArtistRelatedArtists;
