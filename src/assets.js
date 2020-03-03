const pool = require("./postgres");


function convertToLong(price) {
    return price * 1000;
}

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

            console.log(`Saving price for '${symbol}' and ${price.day}`);
            const result = await client.query({
                    text: 'insert into asset_price(day, symbol, open, high, low, close, adjusted_close, volume, ' +
                        'dividend_amount, split_coefficient) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ' +
                        'ON CONFLICT ON CONSTRAINT asset_price_pk DO NOTHING',
                    values: [
                        price.day,
                        symbol,
                        convertToLong(price['1. open']),
                        convertToLong(price['2. high']),
                        convertToLong(price['3. low']),
                        convertToLong(price['4. close']),
                        convertToLong(price['5. adjusted close']),
                        convertToLong(price['6. volume']),
                        convertToLong(price['7. dividend amount']),
                        price['8. split coefficient']
                    ]
                }
            );
            if (result.rowCount === 0) {
                console.log(`Skipped insert for '${symbol}' and '${price.day}', price already exists`)
            }
        }
    }

};

