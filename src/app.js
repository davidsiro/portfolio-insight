require('dotenv').config();
const DBMigrate = require('db-migrate');
const dbmigrate = DBMigrate.getInstance(true);
const importAssetPrices = require("./price-importer");


async function migrateDB() {
    console.log("Migrating database...");

    await dbmigrate.up();

    console.log("Migration finished...");
}

async function run() {
    console.log("Starting up...");

    await migrateDB();

    await importAssetPrices()

    // const AlphaVantageAPI = require('./alpha-vantage')
    // const alphaVantageUrl = process.env.ALPHA_VANTAGE_URL ||'https://www.alphavantage.co';
    // const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    //
    // const api = new AlphaVantageAPI({apiKey: apiKey, url: alphaVantageUrl});

    // const prices = await api.fetchDailyPrices("WRD.PAR");
    // console.log("Prices: " + JSON.stringify(prices));
}

run();

