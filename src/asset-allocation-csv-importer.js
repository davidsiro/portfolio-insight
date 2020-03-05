require('dotenv').config();
const {saveTransactions} = require('./assets');
const {readTransactionsFromCSV} = require('./degiro');

const inputFile = process.argv.slice(2)[0];
if (!inputFile) {
    console.log(`No input file specified`);
    process.exit(1);
}
console.log(`Going to import ${inputFile}`);

(async () => {
    try {
        const transactions = await readTransactionsFromCSV(inputFile);
        await saveTransactions(transactions);
    } catch (e) {
        console.log("Failed to import CSV");
        console.log("Error: " + e);
        process.exit(1)
    }
    process.exit()
})();
