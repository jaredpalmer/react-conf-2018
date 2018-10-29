import * as ReferenceDataAPI from './apis/referenceData';
import * as StocksAPI from './apis/stocks';
/**
 * This class handles communication with the IEX API in a type-safe and flexible
 * way. It is usable in Browser, React Native, and NodeJS contexts.
 */
export default class IEXClient {
    private fetchFunction;
    private httpsEndpoint;
    /**
     * @param fetchFunction A function that is API compatible with the browser
     *  fetch function. In browsers and React Native contexts, the global fetch
     *  object can be passed in. In NodeJS, a library like fetch-ponyfill can be
     *  used to provide such a function.
     * @param httpsEndpoint An optional argument to override the IEX API endpoint.
     *  Unless you have a specific mock endpoint or the like in mind, it is
     *  recommended to omit this argument.
     */
    constructor(fetchFunction: typeof fetch, httpsEndpoint?: string);
    /**
     * This function does a straight pass-through request to the IEX api using the
     * path provided. It can be used to do any call to the service, including ones
     * that respond with content-type text/csv or application/json.
     *
     * @example
     *   request('/stock/aapl/price')
     *   request('/stock/aapl/quote?displayPercent=true')
     *
     * @see https://iextrading.com/developer/docs/#getting-started
     *
     * @param path The path to hit the IEX API endpoint at.
     */
    request(path: string): Promise<any>;
    /**
     * Gets the full list of stock symbols supported by IEX.
     *
     * @see https://iextrading.com/developer/docs/#symbols
     */
    symbols(): Promise<ReferenceDataAPI.StockSymbol[]>;
    /**
     * Gets the quote information of a given stock.
     *
     * @see https://iextrading.com/developer/docs/#quote
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param [displayPercent=false] If set to true, all percentage values will be multiplied by a factor of 100.
     */
    stockQuote(stockSymbol: string, displayPercent?: boolean): Promise<StocksAPI.QuoteResponse>;
    /**
     * Gets charting data for a stock in a given range.
     *
     * @see https://iextrading.com/developer/docs/#chart
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The time range to load chart data for.
     */
    stockChart(stockSymbol: string, range: StocksAPI.ChartRangeOption): Promise<StocksAPI.ChartResponse>;
    /**
     * Gets the price and time for the open and close of a stock.
     *
     * @see https://iextrading.com/developer/docs/#open-close
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockOpenClose(stockSymbol: string): Promise<StocksAPI.OpenCloseResponse>;
    /**
     * Gets previous day adjusted price data for a single stock, or an object
     * keyed by symbol of price data for the whole market.
     *
     * @see https://iextrading.com/developer/docs/#previous
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockPrevious(stockSymbol: string): Promise<StocksAPI.PreviousResponse>;
    /**
     * Gets information about the company associated with the stock symbol.
     *
     * @see https://iextrading.com/developer/docs/#company
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockCompany(stockSymbol: string): Promise<StocksAPI.CompanyResponse>;
    /**
     * Gets key stats for the given stock symbol.
     *
     * @see https://iextrading.com/developer/docs/#key-stats
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockKeyStats(stockSymbol: string): Promise<StocksAPI.KeyStatsResponse>;
    /**
     * Gets a list of peer tickerss for the given symbols.
     *
     * @see https://iextrading.com/developer/docs/#peers
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockPeers(stockSymbol: string): Promise<string[]>;
    /**
     * Similar to the peers endpoint, except this will return most active market
     * symbols when peers are not available. If the symbols returned are not
     * peers, the peers key will be false. This is not intended to represent a
     * definitive or accurate list of peers, and is subject to change at any time.
     *
     * @see https://iextrading.com/developer/docs/#relevant
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockRelevant(stockSymbol: string): Promise<StocksAPI.RelevantResponse>;
    /**
     * Gets a list of news articles related to the given stock.
     *
     * @see https://iextrading.com/developer/docs/#news
     *
     * @param stockSymbol The symbol of the stock to fetch news for.
     * @param [range=10] The number of news articles to pull. Defaults to 10 if omitted.
     */
    stockNews(stockSymbol: string, range?: StocksAPI.NewsRange): Promise<StocksAPI.News[]>;
    /**
     * Gets income statement, balance sheet, and cash flow data from the four most recent reported quarters.
     *
     * @see https://iextrading.com/developer/docs/#financials
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockFinancials(stockSymbol: string): Promise<StocksAPI.FinancialsResponse>;
    /**
     * Gets earnings data from the four most recent reported quarters.
     *
     * @see https://iextrading.com/developer/docs/#earnings
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockEarnings(stockSymbol: string): Promise<StocksAPI.EarningsResponse>;
    /**
     * Gets divdends paid by the company over the given range.
     *
     * @see https://iextrading.com/developer/docs/#dividends
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The date range to get dividends from.
     */
    stockDividends(stockSymbol: string, range: StocksAPI.DividendRange): Promise<StocksAPI.Dividend[]>;
    /**
     * Gets stock splits of the company over the given range.
     *
     * @see https://iextrading.com/developer/docs/#splits
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The date range to get splits from.
     */
    stockSplits(stockSymbol: string, range: StocksAPI.SplitRange): Promise<StocksAPI.Split[]>;
    /**
     * Gets an object containing a URL to the company's logo.
     *
     * @see https://iextrading.com/developer/docs/#logo
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockLogo(stockSymbol: string): Promise<StocksAPI.LogoResponse>;
    /**
     * Fetches the price of a given stock.
     *
     * @see https://iextrading.com/developer/docs/#price
     * @param stockSymbol The symbol of the stock to fetch prices for.
     * @return A single number, being the IEX real time price, the 15 minute
     *  delayed market price, or the previous close price, is returned.
     */
    stockPrice(stockSymbol: string): Promise<number>;
    /**
     * Gets the 15 minute delayed market quote.
     *
     * @see https://iextrading.com/developer/docs/#delayed-quote
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockDelayedQuote(stockSymbol: string): Promise<number>;
    /**
     * Get a list of quotes for the top 10 symbols in a specified list.
     *
     * @see https://iextrading.com/developer/docs/#list
     * @param list The market list to fetch quotes from.
     * @param [displayPercent=false] If set to true, all percentage values will be multiplied by a factor of 100.
     */
    stockMarketListTopTen(list: StocksAPI.MarketList, displayPercent?: boolean): Promise<StocksAPI.QuoteResponse[]>;
    /**
     * Gets an array of effective spread, eligible volume, and price improvement
     * of a stock, by market. Unlike volume-by-venue, this will only return a
     * venue if effective spread is not ‘N/A’. Values are sorted in descending
     * order by effectiveSpread. Lower effectiveSpread and higher priceImprovement
     * values are generally considered optimal.
     *
     * @see https://iextrading.com/developer/docs/#effective-spread
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockEffectiveSpread(stockSymbol: string): Promise<StocksAPI.EffectiveSpread[]>;
    /**
     * Gets 15 minute delayed and 30 day average consolidated volume percentage of
     * a stock, by market. This call will always return 13 values, and will be
     * sorted in ascending order by current day trading volume percentage.
     *
     * @see https://iextrading.com/developer/docs/#volume-by-venue
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockVolumeByVenue(stockSymbol: string): Promise<StocksAPI.VolumeByVenue[]>;
}
