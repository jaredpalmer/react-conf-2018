'use strict';
/**
 * This module provides access to the News API
 * https://newsapi.org/
 *
 * The API provides access to recent news headlines
 * from many popular news sources.
 *
 * The author of this code has no formal relationship with NewsAPI.org and does not
 * claim to have created any of the facilities provided by NewsAPI.org.
 */

const fetch = require('node-fetch'),
  qs = require('querystring'),
  host = 'https://newsapi.org';

let API_KEY; // To be set by clients

class NewsAPI {
  constructor (apiKey) {
    if (!apiKey) throw new Error('No API key specified');
    API_KEY = apiKey;
    this.v2 = {
      topHeadlines (...args) {
        const { params = { language: 'en' }, options, cb } = splitArgsIntoOptionsAndCallback(args);
        const url = createUrlFromEndpointAndOptions('/v2/top-headlines', params);
        return getDataFromWeb(url, options, API_KEY, cb);
      },

      everything (...args) {
        const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
        const url = createUrlFromEndpointAndOptions('/v2/everything', params);
        return getDataFromWeb(url, options, API_KEY, cb);
      },

      sources (...args) {
        const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
        const url = createUrlFromEndpointAndOptions('/v2/sources', params);
        return getDataFromWeb(url, options, API_KEY, cb);
      }
    }
  }

  sources (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/v1/sources', params);
    return getDataFromWeb(url, options, null, cb);
  }

  articles (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/v1/articles', params);
    return getDataFromWeb(url, options, API_KEY, cb);
  }
}

class NewsAPIError extends Error {
  constructor(err) {
    super();
    this.name = `NewsAPIError: ${err.code}`;
    this.message = err.message;
  }
}

/**
 * Takes a variable-length array that represents arguments to a function and attempts to split it into
 * an 'options' object and a 'cb' callback function.
 * @param {Array}   args The arguments to the function
 * @return {Object}
 */
function splitArgsIntoOptionsAndCallback (args) {
  let params;
  let options;
  let cb;
  if (args.length > 1) {
    const possibleCb = args[args.length - 1];
    if ('function' === typeof possibleCb) {
      cb = possibleCb;
      options = args.length === 3 ? args[1] : undefined;
    } else {
      options = args[1];
    }
    params = args[0];
  } else if ('object' === typeof args[0]) {
    params = args[0];
  } else if ('function' === typeof args[0]) {
    cb = args[0];
  }
  return { params, options, cb };
}

/**
 * Creates a url string from an endpoint and an options object by appending the endpoint
 * to the global "host" const and appending the options as querystring parameters.
 * @param {String} endpoint
 * @param {Object} [options]
 * @return {String}
 */
function createUrlFromEndpointAndOptions (endpoint, options) {
  const query = qs.stringify(options);
  const baseURL = `${host}${endpoint}`;
  return query ? `${baseURL}?${query}` : baseURL;
}

/**
 * Takes a URL string and returns a Promise containing
 * a buffer with the data from the web.
 * @param  {String} url      A URL String
 * @param  {String} apiKey   (Optional) A key to be used for authentication
 * @return {Promise<Buffer>} A Promise containing a Buffer
 */
function getDataFromWeb(url, options, apiKey, cb) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { headers: {} };
  if (apiKey) {
    reqOptions.headers['X-Api-Key'] = apiKey;
  }
  if (options && options.noCache === true) {
    reqOptions.headers['X-No-Cache'] = 'true';
  }
  return fetch(url, reqOptions).then(res => Promise.all([res, res.json()])).then(([res, body]) => {
    if (body.status === 'error') throw new NewsAPIError(body);
    // 'showHeaders' option can be used for clients to debug response headers
    // response will be in form of { headers, body }
    if (options && options.showHeaders) {
      if (useCallback) return cb(null, { headers: res.headers, body });
      return { headers: res.headers, body };
    }
    if (useCallback) return cb(null, body);
    return body;
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

module.exports = NewsAPI;
