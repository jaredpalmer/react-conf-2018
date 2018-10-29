import { fetch } from './auth';
import uniqBy from 'lodash.uniqby';

import {
  ArtistsJSON,
  ArtistListJSON,
  ArtistAlbumsJSON,
  ArtistTopTracksJSON,
} from './data';

export function fetchArtistListJSON() {
  return makeFakeAPICall('/artists', ArtistListJSON);
}

export function fetchArtistJSON(id) {
  return makeFakeAPICall(
    `/artists/${id}`,
    ArtistsJSON(fakeRequestTime)[id]
  );
}

export function fetchArtistAlbumsJSON(id) {
  return makeFakeAPICall(
    `/artists/${id}/albums`,
    uniqBy(ArtistAlbumsJSON(fakeRequestTime)[id], 'name')
  );
}

export function fetchArtistTopTracksJSON(id) {
  return makeFakeAPICall(
    `/artists/${id}/top-tracks`,
    uniqBy(ArtistTopTracksJSON(fakeRequestTime)[id], 'name')
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
  const res = await fetch(
    `https://api.spotify.com/v1/albums/${id}/tracks`
  );

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
