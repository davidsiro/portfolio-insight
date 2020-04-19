require('dotenv').config();
const {logger} = require('./logger');
const {saveTransactions} = require('./assets');
const {readTransactionsFromCSV} = require('./degiro');

const inputFile = process.argv.slice(2)[0];
if (!inputFile) {
    logger.info(`No input file specified`);
    process.exit(1);
}
logger.info(`Going to import ${inputFile}`);

(async () => {
    try {
        const transactions = await readTransactionsFromCSV(inputFile);
        await saveTransactions(transactions);
    } catch (e) {
        logger.info("Failed to import CSV");
        logger.info("Error: " + e);
        process.exit(1)
    }
    process.exit()
})();
