export interface StockSymbol {
    date: string;
    iexId: string;
    isEnabled: boolean;
    name: string;
    symbol: string;
    type: 'cs' | 'et' | 'ps' | 'bo' | 'su' | 'N/A' | string;
}
