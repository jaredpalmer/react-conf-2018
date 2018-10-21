import { fetch } from './auth';

export async function fetchMeJSON() {
  const res = await fetch('https://api.spotify.com/v1/me');
  return await res.json();
}

export async function fetchArtistTopTracksJSON(id) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
  );
  return (await res.json()).tracks;
}

export async function fetchArtistJSON(id) {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`);
  return await res.json();
}

export async function fetchArtistRelatedArtistsJSON(id) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${id}/related-artists`
  );
  return (await res.json()).artists;
}

export async function searchArtistsJSON(query) {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query.trim()}&type=artist,album`
  );
  const { artists } = await res.json();
  return artists && artists.items ? artists.items : [];
}
