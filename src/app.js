require('dotenv').config();
const {logger} = require('./logger');
const DBMigrate = require('db-migrate');
const dbmigrate = DBMigrate.getInstance(true);
const importAssetPrices = require("./price-importer");


async function migrateDB() {
    logger.info("Migrating database...");

    await dbmigrate.up();

    logger.info("Migration finished...");
}

async function run() {
    logger.info("Starting up...");

    await migrateDB();

    let downloadIntervalMillis;
    if (process.env.PRICE_DOWNLOAD_INTERVAL_HOURS) {
        // convert hours to downloadIntervalMillis
        downloadIntervalMillis = process.env.PRICE_DOWNLOAD_INTERVAL_HOURS * 60 * 60 * 1000
    } else {
        downloadIntervalMillis = 10 * 1000;
    }

    setInterval(async () => await importAssetPrices(), downloadIntervalMillis);
}

run();

