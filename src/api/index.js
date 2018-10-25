import { fetch } from './auth';
import uniqBy from 'lodash.uniqby';

import {
  ArtistsJSON,
  ArtistListJSON,
  ArtistAlbumsJSON,
  ArtistTopTracksJSON,
} from './data';

export async function fetchMeJSON() {
  const res = await fetch('https://api.spotify.com/v1/me');
  return await res.json();
}

export function fetchArtistListJSON() {
  return makeFakeAPICall('/artists', ArtistListJSON);
}

export function fetchArtistJSON(id) {
  return makeFakeAPICall(`/artists/${id}`, ArtistsJSON[id]);
}

export function fetchArtistAlbumsJSON(id) {
  return makeFakeAPICall(
    `/artists/${id}/albums`,
    uniqBy(ArtistAlbumsJSON[id], 'name')
  );
}

export function fetchArtistTopTracksJSON(id) {
  return makeFakeAPICall(
    `/artists/${id}/top-tracks`,
    uniqBy(ArtistTopTracksJSON[id], 'name')
  );
}

export function searchArtistsJSON(query) {
  return makeFakeAPICall(`/artists`, ArtistListJSON);
}

export async function fetchArtistRelatedArtistsJSON(id) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${id}/related-artists`
  );
  return (await res.json()).artists;
}

export async function fetchAlbumJSON(id) {
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`);
  return uniqBy((await res.json()).items, 'name');
}

export async function fetchAlbumTracksJSON(id) {
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`);

  return (await res.json()).items;
}

let fakeRequestTime = 1000;
let onProgress = () => true;

export function setFakeRequestTime(val) {
  fakeRequestTime = val;
}

export function setProgressHandler(handler) {
  onProgress = handler;
}

export function setPauseNewRequests(value) {
  shouldPauseNewRequests = value;
}

let shouldPauseNewRequests = false;
let notifiers = {};
let isPausedUrl = {};

export function setPaused(url, isPaused) {
  const wasPaused = isPausedUrl[url];
  isPausedUrl[url] = isPaused;
  if (isPaused !== wasPaused) {
    notifiers[url]();
  }
}

function makeFakeAPICall(url, result) {
  let i = 1;
  return new Promise(resolve => {
    isPausedUrl[url] = shouldPauseNewRequests;
    function notify() {
      if (!isPausedUrl[url]) {
        i++;
      }
      onProgress(url, i, isPausedUrl[url]);
      if (isPausedUrl[url]) {
        return;
      }
      if (i === 100) {
        resolve(result);
      } else {
        setTimeout(notify, fakeRequestTime / 100);
      }
    }
    notifiers[url] = notify;
    notify();
  });
}

// export async function fetchMeJSON() {
//   const res = await fetch('https://api.spotify.com/v1/me');
//   return await res.json();
// }

// export async function fetchArtistTopTracksJSON(id) {
//   const res = await fetch(
//     `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
//   );
//   return (await res.json()).tracks;
// }

// export async function fetchArtistJSON(id) {
//   const res = await fetch(`https://api.spotify.com/v1/artists/${id}`);
//   return await res.json();
// }

// export async function fetchArtistRelatedArtistsJSON(id) {
//   const res = await fetch(
//     `https://api.spotify.com/v1/artists/${id}/related-artists`
//   );
//   return (await res.json()).artists;
// }

// export async function searchArtistsJSON(query) {
//   const res = await fetch(
//     `https://api.spotify.com/v1/search?q=${query.trim()}&type=artist,album`
//   );
//   const { artists } = await res.json();
//   return artists && artists.items ? artists.items : [];
// }

// export async function fetchArtistAlbumsJSON(id) {
//   const res = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`);
//   return uniqBy((await res.json()).items, 'name');
// }

// export async function fetchAlbumJSON(id) {
//   const res = await fetch(`https://api.spotify.com/v1/albums/${id}`);
//   return uniqBy((await res.json()).items, 'name');
// }

// export async function fetchAlbumTracksJSON(id) {
//   const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`);

//   return (await res.json()).items;
// }
