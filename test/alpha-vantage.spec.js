const AlphaVantageAPI = require('../src/alpha-vantage')
const assert = require('assert');

describe('Alpha Vantage API', () => {
    describe('fetch', () => {
        it('should fetchDailyPrices symbol', async () => {
            await new AlphaVantageAPI("url").fetchDailyPrices("WRD")
        });
    });
});
