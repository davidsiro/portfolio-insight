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
        // 2 minutes by default, in prod it should be like every 12 hrs
        logger.info("DEV only - running data collection on shorter intervals")
        downloadIntervalMillis = 10 * 1000;
    }

    logger.info("pi-data-collector starting...")
    logger.info("TODO Print important startup options")
    setInterval(async () => await importAssetPrices(), downloadIntervalMillis);
}

run();

