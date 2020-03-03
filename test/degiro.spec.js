const moment = require("moment");

require('dotenv').config();
const {readTransactionsFromCSV} = require("../src/degiro");

const assert = require('assert');

describe('Degiro', () => {
    describe('transaction csv export', () => {
        it('should parse exported transaction', async () => {
            const records = await readTransactionsFromCSV("./test/transactions.csv");

            assert.equal(records.length, 6);
            const record = records[0];

            assert.equal("3f2494d3-ab64-4f65-81db-3167bc66c767", record.transactionId);
            assert.equal(200100, record.price);
            assert.equal("IE00B4X9L533", record.isin);
            assert.equal(49, record.quantity);
        });
    });
});

