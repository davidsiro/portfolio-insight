const axios = require('axios');

class YahooAPI {

    constructor(url) {
        this.url = url
    }

    async fetch(symbol) {
        const apiKey = 'put key here'
        const testUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=WRD.PAR&apikey=${apiKey}`;

        const response = await axios.get(testUrl);
        console.log(response.data)
    }

}

module.exports = YahooAPI;