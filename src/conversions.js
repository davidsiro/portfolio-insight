module.exports = {

    convertPriceToLong: function (price) {
        // alpha vantage/degiro has prices with four decimals
        // hack to overcome js floating point arithmetics
        return Number(price.replace("\.", ""));
    }

};