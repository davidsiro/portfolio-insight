const {logger} = require('./logger');
const {convertPriceToLong} = require("./conversions");
const pool = require("./postgres");

module.exports = {

    findAllAssets: function () {
        return pool.query('SELECT * FROM asset').then(rs => rs.rows);
    },

    savePrices: async function (symbol, prices) {
        const client = await pool.connect();

        for (const price of prices) {
            // result = Array(8)
            // 0 = "1. open"
            // 1 = "2. high"
            // 2 = "3. low"
            // 3 = "4. close"
            // 4 = "5. adjusted close"
            // 5 = "6. volume"
            // 6 = "7. dividend amount"
            // 7 = "8. split coefficient"
            // length = 8
            // __proto__ = Array(0)

            logger.info(`Saving price for '${symbol}' and ${price.day}`);
            try {
                const result = await client.query({
                        text: 'insert into asset_price(day, symbol, open, high, low, close, adjusted_close, volume, ' +
                            'dividend_amount, split_coefficient) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ' +
                            'ON CONFLICT ON CONSTRAINT asset_price_pk DO NOTHING',
                        values: [
                            price.day,
                            symbol,
                            convertPriceToLong(price['1. open']),
                            convertPriceToLong(price['2. high']),
                            convertPriceToLong(price['3. low']),
                            convertPriceToLong(price['4. close']),
                            convertPriceToLong(price['5. adjusted close']),
                            convertPriceToLong(price['6. volume']),
                            convertPriceToLong(price['7. dividend amount']),
                            price['8. split coefficient']
                        ]
                    }
                );
                if (result.rowCount === 0) {
                    logger.info(`Skipped insert for '${symbol}' and '${price.day}', price already exists`)
                }

            } catch (e) {
                logger.info(`Failed to save price entry: ${JSON.stringify(price)}`);
                logger.info(`Error: ${e}`);
            }
        }
    },

    saveTransactions: async function (transactions) {
        const client = await pool.connect();

        let total = 0;
        for (const transaction of transactions) {
            const transactionId = transaction.transactionId;
            const result = await client.query({
                text: 'insert into asset_allocation (transaction_id, event_timestamp, isin, quantity, price,' +
                    ' buy_sell) values ($1, $2, $3, $4, $5, $6) ON CONFLICT ON CONSTRAINT asset_allocation_pk DO' +
                    ' NOTHING',
                values: [
                    transactionId,
                    transaction.eventTimestamp,
                    transaction.isin,
                    transaction.quantity,
                    transaction.price,
                    'B'
                ]
            });
            if (result.rowCount === 0) {
                logger.info(`Skipped insert for '${transactionId}' entry already exists`)
            } else {
                total++;
            }
        }
        logger.info(`Inserted ${total} records`)
    }

};

