const {findAllAssets, savePrices} = require('../src/assets');
const AlphaVantageAPI = require('./alpha-vantage');
const alphaVantageUrl = process.env.ALPHA_VANTAGE_URL || 'https://www.alphavantage.co';
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

const api = new AlphaVantageAPI({apiKey: apiKey, url: alphaVantageUrl});

async function importAssetPrices() {
    const assets = await findAllAssets();

    return Promise.all(
        assets.map(asset => {
            const symbol = asset.symbol.trim();
            console.log("Fetching prices for: " + symbol);
            return api
                .fetchDailyPrices(symbol)
                .then(prices => savePrices(symbol, prices));
        })
    );
}

module.exports = importAssetPrices;