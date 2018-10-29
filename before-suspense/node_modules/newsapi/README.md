# newsapi

A node interface for NewsAPI.

[![npm](https://img.shields.io/npm/v/newsapi.svg)](https://www.npmjs.com/package/newsapi)
[![npm](https://img.shields.io/npm/dt/newsapi.svg)](https://www.npmjs.com/package/newsapi)
[![Build Status](https://travis-ci.org/bzarras/newsapi.svg?branch=master)](https://travis-ci.org/bzarras/newsapi)

Up-to-date news headlines and metadata in JSON from 70+ popular news sites. Powered by NewsAPI.org.

You will need an API key from [https://newsapi.org](https://newsapi.org).

Please look at their [documentation](https://newsapi.org/docs) to see how to use the API. The convenience functions provided by this module
simply pass their options along as querystring parameters to the REST API, so the [documentation](https://newsapi.org/docs)
is totally valid. There are some usage examples below to see how these options should be passed in.

If you use this in a project, add a 'powered by' attribution link back to NewsAPI.org

## Add to your project
```shell
$ npm install newsapi --save
```

## Test
```shell
$ API_KEY=<your api key> npm test
```

## Example usage of v2 API
All methods support promises and node-style callbacks.
```js
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR_API_KEY');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  q: 'trump',
  category: 'politics',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});

// To query everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'trump',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk,techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});

// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});
```

## Example usage of v1 legacy API
```js
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR_API_KEY');

// To query articles:
newsapi.articles({
  source: 'associated-press', // required
  sortBy: 'top' // optional
}).then(articlesResponse => {
  console.log(articlesResponse);
  /*
    {
      status: "ok",
      source: "associated-press",
      sortBy: "top",
      articles: [...]
    }
   */
});

// To query sources:
newsapi.sources({
  category: 'technology', // optional
  language: 'en', // optional
  country: 'us' // optional
}).then(sourcesResponse => {
  console.log(sourcesResponse);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});

// For both methods you can also use traditional Node callback style:
newsapi.articles({
  source: 'associated-press',
  sortBy: 'top'
}, (err, articlesResponse) => {
  if (err) console.error(err);
  else console.log(articlesResponse);
});
```

## Caching
[NewsAPI's caching behavior](https://newsapi.org/docs/caching).
You can disable caching on a request level by adding the `noCache: true` option to your queries.
```js
newsapi.v2.everything({
  sources: 'bbc-news'
}, {
  noCache: true
}).then(response => {
  ...
});
```
