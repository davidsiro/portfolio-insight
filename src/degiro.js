const {convertPriceToLong} = require("./conversions");
const moment = require('moment');
const fs = require('fs');
const parse = require('csv-parse');

module.exports = {

    readTransactionsFromCSV: function (input) {
        return new Promise(((resolve, reject) => {
            fs.readFile(input, async (err, data) => {
                if (err !== null) {
                    reject(err);
                    return;
                }

                const parser = parse(data, {from_line: 2});
                const records = [];

                for await (const record of parser) {
                    // record = Array(18)
                    // 0 = "03-03-2020"
                    // 1 = "10:22"
                    // 2 = "HSBC MSCI WORLD"
                    // 3 = "IE00B4X9L533"
                    // 4 = "EPA"
                    // 5 = "49"
                    // 6 = "EUR"
                    // 7 = "20.0100"
                    // 8 = "EUR"
                    // 9 = "-980.49"
                    // 10 = "EUR"
                    // 11 = "-980.49"
                    // 12 = ""
                    // 13 = ""
                    // 14 = ""
                    // 15 = "EUR"
                    // 16 = "-980.49"
                    // 17 = "3f2494d3-ab64-4f65-81db-3167bc66c767"
                    records.push({
                        transactionId: record[17],
                        eventTimestamp: moment(`${record[0]} ${record[1]}`, "DD-MM-YYYY HH:mm"),
                        isin: record[3],
                        quantity: Number(record[5]),
                        price: convertPriceToLong(record[7])
                    })
                }
                resolve(records);
            })
        }));
    }

};