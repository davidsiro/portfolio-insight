const YahooAPI = require('../src/yahoo')
const assert = require('assert');

describe('Yahoo API', function () {
    describe('fetch', function () {
        it('should fetch symbol', function () {
            new YahooAPI("url").fetch("WRD")
        });
    });
});
