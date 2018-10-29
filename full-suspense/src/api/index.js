import uniqBy from 'lodash.uniqby';

import {
  ArtistsJSON,
  ArtistListJSON,
  ArtistAlbumsJSON,
  ArtistTopTracksJSON,
} from './data';

export function fetchArtistJSON(id) {
  return makeFakeAPICall(`/artists/${id}`, ArtistsJSON(fakeRequestTime)[id]);
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

export function fetchArtistListJSON(query) {
  return makeFakeAPICall(`/artists`, ArtistListJSON);
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
