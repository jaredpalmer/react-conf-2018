iex-api
=======

**Currently still a work-in-progress, but it should already be quite usable.**

An unofficial SDK for using the free [IEX API][docs]. You can use this to get
stock market information. This module is usable in Web Browsers, React Native,
and NodeJS (though a polyfill/ponyfill for the fetch API is needed in NodeJS).


Features
--------

* Usable across all modern JS runtimes (with polyfills needed for fetch API where it's
  not available)
* TypeScript support and accurate type definitions (with strict null checks)
* Convenient object for getting API attribution information
* Overridable API endpoint to allow for flexibility
* Handles both JSON and CSV responses
* Client that returns ES6 promises usable with async/await syntax


Installation
-----

```
npm install --save iex-api
```


Usage
-----

### In Web Browsers and React Native

```typescript
import { IEXClient } from 'iex-api'

const iex = new IEXClient(fetch)
iex.stockCompany('AAPL')
  .then(quote => console.log(quote))

  // {
  //   symbol: "AAPL",
  //   companyName: "Apple Inc.",
  //   exchange: "Nasdaq Global Select",
  //   industry: "Computer Hardware",
  //   website: "http://www.apple.com",
  //   description: "Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.",
  //   CEO: "Timothy D. Cook",
  //   issueType: "cs",
  //   sector: "Technology"
  // }
```

### In NodeJS

To use this in NodeJS and any other JS runtime that doesn't provide the fetch
API, you will have to provide it through a polyfill or ponyfill. I recommend
using [fetch-ponyfill][fetchPonyfill] for this purpose, since it doesn't mess
with the global context. You may find [isomorphic-fetch][isoFetch] easier to
use, however.


```
npm install --save isomorphic-fetch
npm insatll --save-dev @types/isomorphic-fetch # If using TypeScript
```

```typescript
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'

const iex = new IEXClient(_fetch)
iex.stockCompany('AAPL')
  .then(quote => console.log(quote))

  // {
  //   symbol: "AAPL",
  //   companyName: "Apple Inc.",
  //   exchange: "Nasdaq Global Select",
  //   industry: "Computer Hardware",
  //   website: "http://www.apple.com",
  //   description: "Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.",
  //   CEO: "Timothy D. Cook",
  //   issueType: "cs",
  //   sector: "Technology"
  // }
```


To Do:
------
* Define types and definitions for specific API operations:
  * Stocks
    * ~~Quote~~
    * ~~Chart~~
    * Batch Requests
    * Book
    * ~~Open / Close~~
    * ~~Previous~~
    * ~~Company~~
    * ~~Key Stats~~
    * ~~Peers~~
    * ~~Relevant~~
    * ~~News~~
    * ~~Financials~~
    * ~~Earnings~~
    * ~~Dividends~~
    * ~~Splits~~
    * ~~Logo~~
    * ~~Price~~
    * ~~Delayed Quote~~
    * ~~List~~
    * ~~Effective Spread~~
    * ~~Volume by Venue~~
  * ~~Reference Data~~
    * ~~Symbols~~
  * IEX Market Data
    * TOPS
    * Last
    * HIST
    * DEEP
    * Book
    * Trades
    * System Event
    * Trading Status
    * Operational Halt Status
    * Short Sale Price Test Status
    * Security Event
    * Trade Break
    * Auction
  * IEX Stats
    * Intraday
    * Recent
    * Records
    * Historical Summary
    * Historical Daily
  * Markets
    * Market
* Increase integration test coverage
* Add documentation. In the meantime, the code is pretty well commented and
  should hopefully be easy to use thanks to type definitions.
* Do runtime checks against each API endpoint with all possible inputs to
  discover possible enums, null responses,
* Report discrepencies between docs and actual API responses to IEX




  [docs]: https://iextrading.com/developer/docs
  [fetchPonyfill]: https://github.com/qubyte/fetch-ponyfill
  [isoFetch]: https://github.com/matthew-andrews/isomorphic-fetch
