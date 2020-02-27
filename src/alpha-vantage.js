const axios = require('axios');

class AlphaVantageAPI {

    constructor(configuration) {
        const {url, apiKey} = configuration;
        this.url = url;
        this.apiKey = apiKey
    }

    fetchDailyPrices(symbol) {
        const tsUrl = `${this.url}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${this.apiKey}`;
        return axios.get(tsUrl).then(r => r.data);
    }

}

module.exports = AlphaVantageAPI;