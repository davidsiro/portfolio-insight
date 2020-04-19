require('dotenv').config();
const {logger} = require('./logger');
const {saveTransactions} = require('./assets');
const {readTransactionsFromStream} = require('./degiro');

/**
 * Importer that reads input from stdin
 *
 *
 *
 */
process.stdin
    // TODO this is only a chunk, might not always has all the data in buffer
    .on('data', async data => {
        try {
            const transactions = await readTransactionsFromStream(data);
            await saveTransactions(transactions);
            process.exit()
        } catch (e) {
            logger.error("Failed to import transactions:");
            logger.error(e);
            process.exit(1);
        }
        process.exit(0)
    })
