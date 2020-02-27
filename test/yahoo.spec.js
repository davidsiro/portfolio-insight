const YahooAPI = require('../src/yahoo')
const assert = require('assert');

describe('Yahoo API', () => {
    describe('fetch', () => {
        it('should fetch symbol', async () => {
            await new YahooAPI("url").fetch("WRD")
        });
    });
});
