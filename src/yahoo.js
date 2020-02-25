class YahooAPI {

    constructor(url) {
        this.url = url
    }

    fetch(symbol) {
        console.log(`${this.url}/${symbol}`)
    }

}

module.exports = YahooAPI;