const moment = require('moment');
const axios = require('axios');

class AlphaVantageAPI {

    constructor(configuration) {
        const {url, apiKey} = configuration;
        this.url = url;
        this.apiKey = apiKey
    }

    fetchDailyPrices(symbol) {
        const tsUrl = `${this.url}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${this.apiKey}`;
        return axios.get(tsUrl).then(r => this.mapResponseToPrices(r.data));
    }

    mapResponseToPrices(resp) {
        const metadata = resp['Meta Data'];
        const timeSeries = resp['Time Series (Daily)'];

        // filter out all TS except current day, which is still in Trading
        const lastRefreshed = moment( metadata['3. Last Refreshed']);
        const prices = [];
        for (let day in timeSeries) {
            const dayParsed = moment(day);
            if (dayParsed.isSame(lastRefreshed)) {
                continue;
            }
            prices.push(Object.assign(timeSeries[day], {day: dayParsed}));
        }

        return prices;
    }

}

module.exports = AlphaVantageAPI;